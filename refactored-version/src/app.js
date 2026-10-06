import "./styles/app.css";
import {requestWithAuth} from "./shared/api/httpClient.js";
import {ALL_PERMISSIONS, PERMISSIONS, ROUTE_PERMISSIONS, canAccessPermission} from "./features/access/permissions.js";
import {formatApiDateTime, formatNumber, safeText as safe} from "./shared/formatters/displayFormatters.js";
import {mapDashboardData} from "./features/dashboard/dashboardData.js";
import {createSalesTrendData, renderSalesTrendChart} from "./features/dashboard/salesTrend.js";
import {bindDashboardPageEvents, renderDashboardPageShell} from "./features/dashboard/dashboardPage.js";
import {clearAuthSession, getAuthToken} from "./features/auth/sessionStorage.js";
import {resolveRoute, runRouteHandler} from "./app/router.helpers.js";
import {showModal as showSharedModal} from "./components/ui/modal.js";
import {bindDrawerPageEvents} from "./components/ui/pageEvents.js";
import {
    bindFactoryPageEvents,
    createFactoryPayload,
    renderFactoryPageShell,
    updateCertificateField,
    updateManualIpFields,
} from "./features/factory/factoryPage.js";
import {bindDevelopPageEvents} from "./features/develop/developPage.js";
import {renderLogsPageShell} from "./features/logs/logsPage.js";
import {renderInfoPageShell} from "./features/info/infoPage.js";
import {renderServiceConfigurationPageShell} from "./features/serviceConfiguration/serviceConfigurationPage.js";
import {
    CLIENT_MESSAGES,
    getClientApiStatus,
    isClientActive,
    validateClientForm,
} from "./features/clients/clientRules.js";
import {createBalanceUpdate, isCsvBlob, validateGlobalBalance} from "./features/balance/balanceRules.js";
import {bindBalancePageEvents, renderBalancePageShell} from "./features/balance/balancePage.js";
import {
    countUnreadNotifications,
    getNotificationsFromPayload,
} from "./features/notifications/notificationRules.js";
import {
    bindNotificationsPageEvents,
    renderNotificationItems,
    renderNotificationsPageShell,
} from "./features/notifications/notificationsPage.js";
import {
    applyQuantityStep,
    createAdvancedPricePayload,
    getAdvancedHintItems,
} from "./features/prices/priceRules.js";
import {
    getWifiSignalLevel,
    serializeSettingsForm,
    sortWifiNetworksBySignal,
    validateApPasswordConfirmation,
} from "./features/settings/settingsRules.js";
import {bindSettingsPageEvents, bindWifiListEvents, renderSettingsPageShell} from "./features/settings/settingsPage.js";
import {
    bindWifiModalEvents,
    renderHiddenWifiModalExtra,
    renderWifiPasswordModalExtra,
} from "./features/settings/wifiModals.js";
import {bindPriceTableEvents, renderPriceTableRows} from "./features/prices/priceTable.js";
import {bindClientTableEvents, renderClientTableRows} from "./features/clients/clientTable.js";
import {bindClientPageEvents} from "./features/clients/clientPage.js";
import {bindPricePageEvents, renderPricePageShell} from "./features/prices/pricePage.js";
import {
    bindPriceAdvancedModalEvents,
    buildAdvancedHint,
    renderPriceAdvancedModalBody,
} from "./features/prices/priceAdvancedModal.js";
import {
    bindClientAdvancedModalEvents,
    renderClientAdvancedModalBody,
    renderClientCreateModalBody,
} from "./features/clients/clientAdvancedModal.js";

//-------- Global Variables ------------

const DEVELOP_MODE = import.meta.env.VITE_DEV_MODE === "true";

const app = document.getElementById("app");
const loader = document.getElementById("loader");

let lastRoute = null;
let ws = null;
let salesTrendPeriod = "week";
let dashboardRawData = {};
let volumeTimeout = null;
let initialFormState = null;
let resolvingChannelError = false;
let wifiScanInProgress = false;
let logoutInProgress = false;

let renderPricesData = {};
let renderDashboardData = null;
let renderInfoData = null;
let renderClientsData = null;
let renderBalanceData = null;
let renderSettingsData = null;
let renderServiceConfigurationData = null;
let renderFactoryData = null;

let pendingPhysicalChange = null;

// =========================================================
//   ACCESS CONTROL / PERMISSIONS
// =========================================================

// اطلاعات کاربر فقط در حافظه نگهداری می‌شود و با هر بار Reload از بک‌اند تازه می‌شود.
let currentUser = null;
let accessInitializationPromise = null;

/**
 * Checks whether the current user can perform an action. Development mode is
 * intentionally open so mock data stays easy to explore.
 */
function hasPermission(permission) {
    return canAccessPermission({developMode: DEVELOP_MODE, user: currentUser, permission});
}

// پیش از عملیات حساس استفاده می‌شود و در صورت نداشتن مجوز اجرای تابع را متوقف می‌کند.
function requirePermission(permission) {
    if (hasPermission(permission)) return true;
    showToast("error", "عدم دسترسی", "شما اجازه انجام این عملیات را ندارید.");
    return false;
}

// المان‌های دارای data-permission را متناسب با دسترسی کاربر مخفی یا غیرفعال می‌کند.
function applyPermissionVisibility(root = document) {
    // تمام دکمه‌ها و لینک‌های Route براساس جدول مرکزی Routeها مخفی می‌شوند.
    root.querySelectorAll?.('a[href^="#/"]').forEach((link) => {
        const routePermission = ROUTE_PERMISSIONS[link.getAttribute("href")];
        if (routePermission) {
            link.classList.toggle("hidden", !hasPermission(routePermission));
        }
    });

    root.querySelectorAll?.("[data-permission]").forEach((element) => {
        const allowed = hasPermission(element.dataset.permission);
        const mode = element.dataset.permissionMode || "hide";

        if (mode === "disable") {
            // وضعیت disabled اولیه (مثلاً قفل‌شده توسط سرور) پس از مجازشدن حفظ می‌شود.
            if (element.dataset.permissionOriginallyDisabled === undefined) {
                element.dataset.permissionOriginallyDisabled = String(element.disabled);
            }
            const originallyDisabled = element.dataset.permissionOriginallyDisabled === "true";
            element.disabled = !allowed || originallyDisabled;
            element.setAttribute("aria-disabled", String(!allowed));
            element.title = allowed ? "" : "شما اجازه انجام این عملیات را ندارید.";
        } else {
            element.classList.toggle("hidden", !allowed);
        }
    });
}

// Permissionهای کاربر را از بک‌اند می‌گیرد؛ در Production نبودن پاسخ معتبر خطا است.
async function initializeAccessControl() {
    if (DEVELOP_MODE) {
        currentUser = {
            id: "developer",
            username: "Developer",
            role: "developer",
            permissions: [...ALL_PERMISSIONS],
        };
    } else {
        const response = await api("/api/auth/me");
        if (!response?.success || !response?.user || !Array.isArray(response.user.permissions)) {
            throw new Error("AUTH_ME_INVALID_RESPONSE");
        }
        currentUser = {
            ...response.user,
            permissions: response.user.permissions.filter((permission) => (
                typeof permission === "string"
            )),
        };
    }

    // نام نمایشی کاربر نیز از همان پاسخ معتبر بک‌اند گرفته می‌شود.
    document.querySelectorAll(".user-name").forEach((element) => {
        element.textContent = currentUser.username || currentUser.name || currentUser.role || "کاربر";
    });

    applyPermissionVisibility();
    // بعد از مشخص‌شدن دسترسی‌ها فقط المان‌های مجاز اجازه نمایش دارند.
    document.body.classList.remove("access-pending");
    return currentUser;
}

// از ارسال چند درخواست هم‌زمان به /api/auth/me جلوگیری می‌کند.
function ensureAccessInitialized() {
    if (!accessInitializationPromise) {
        accessInitializationPromise = initializeAccessControl();
    }
    return accessInitializationPromise;
}

if (DEVELOP_MODE) {
    showLoader(true)
    setTimeout(() => {
        showLoader(false)
    }, 2000)
}

const ICONS = {
    bell: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M10.268 21a2 2 0 0 0 3.464 0"></path> <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path></svg>
                  `,
    cpu: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-cpu-icon lucide-cpu h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><path d="M12 20v2"></path><path d="M12 2v2"></path><path d="M17 20v2"></path><path d="M17 2v2"></path><path d="M2 12h2"></path><path d="M2 17h2"></path><path d="M2 7h2"></path><path d="M20 12h2"></path><path d="M20 17h2"></path><path d="M20 7h2"></path><path d="M7 20v2"></path><path d="M7 2v2"></path><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="8" y="8" width="8" height="8" rx="1"></rect></svg>
                  `,
    menu: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <line x1="3" y1="12" x2="21" y2="12"></line> <line x1="3" y1="6" x2="21" y2="6"></line> <line x1="3" y1="18" x2="21" y2="18"></line></svg>
                  `,
    edit: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 lucide-pen-icon lucide-pen h-4 w-4"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path></svg>
                  `,
    warning: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M12 9v4"></path> <path d="M12 17h.01"></path> <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>
                  `,
    danger: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-6 w-6 lucide-triangle-alert-icon lucide-triangle-alert h-6 w-6"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
                  `,
    success: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-5 w-5 shrink-0 lucide-circle-check-big-icon lucide-circle-check-big h-5 w-5 shrink-0"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                  `,
    close: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 lucide-x-icon lucide-x h-4 w-4"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                  `,
    setting: `
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-settings-icon lucide-settings h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  `,
    wifi: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-wifi-icon lucide-wifi h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><path d="M12 20h.01"></path><path d="M2 8.82a15 15 0 0 1 20 0"></path><path d="M5 12.859a10 10 0 0 1 14 0"></path><path d="M8.5 16.429a5 5 0 0 1 7 0"></path></svg>
                  `,
    products: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-package-icon lucide-package h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
                  `,
    reports: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-receipt-text-icon lucide-receipt-text h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"></path><path d="M14 8H8"></path><path d="M16 12H8"></path><path d="M13 16H8"></path></svg>
                  `,
    users: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-users-icon lucide-users h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
                  `,
    user: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 text-primary-08-main lucide-user-icon lucide-user h-4 w-4 text-primary-08-main"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  `,
    pay: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-credit-card-icon lucide-credit-card h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
                  `,
    wireless: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-radio-icon lucide-radio h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><path d="M16.247 7.761a6 6 0 0 1 0 8.478"></path><path d="M19.075 4.933a10 10 0 0 1 0 14.134"></path><path d="M4.925 19.067a10 10 0 0 1 0-14.134"></path><path d="M7.753 16.239a6 6 0 0 1 0-8.478"></path><circle cx="12" cy="12" r="2"></circle></svg>
                  `,
    logs: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-file-text-icon lucide-file-text h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
                  `,
    server: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground lucide-server-icon lucide-server h-4 w-4 transition-colors text-neutral-08-caption-dark group-hover:text-foreground"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect><rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect><line x1="6" x2="6.01" y1="6" y2="6"></line><line x1="6" x2="6.01" y1="18" y2="18"></line></svg>
                  `,
    exit: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 lucide-log-out-icon lucide-log-out h-4 w-4"><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path></svg>
                  `,
    refresh: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 lucide-refresh-cw-icon lucide-refresh-cw h-4 w-4"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 16H3v5"></path></svg>
                  `,
    download: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 lucide-download-icon lucide-download h-4 w-4"><path d="M12 15V3"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10 5 5 5-5"></path></svg>
                  `,
    delete: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 lucide-trash2-icon lucide-trash-2 h-4 w-4"><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  `,
    key: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 lucide-key-icon lucide-key h-4 w-4"><path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"></path><path d="m21 2-9.6 9.6"></path><circle cx="7.5" cy="15.5" r="5.5"></circle></svg>
                  `,
    upload: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-6 w-6 text-neutral-07-caption-light lucide-upload-icon lucide-upload h-6 w-6 text-neutral-07-caption-light"><path d="M12 3v12"></path><path d="m17 8-5-5-5 5"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path></svg>
                  `,
    location: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 text-primary-08-main lucide-map-pin-icon lucide-map-pin h-4 w-4 text-primary-08-main"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  `,
    debug: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-5 w-5 lucide-bug-icon lucide-bug h-5 w-5"><path d="m8 2 1.88 1.88"></path><path d="M14.12 3.88 16 2"></path><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"></path><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"></path><path d="M12 20v-9"></path><path d="M6.53 9C4.6 8.8 3 7.1 3 5"></path><path d="M6 13H2"></path><path d="M3 21c0-2.1 1.7-3.9 3.8-4"></path><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"></path><path d="M22 13h-4"></path><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"></path></svg>
                  `,
    layout: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 lucide-layout-dashboard-icon lucide-layout-dashboard h-4 w-4"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
                  `,
    save: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-4 w-4 lucide-save-icon lucide-save h-4 w-4"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path><path d="M7 3v4a1 1 0 0 0 1 1h7"></path></svg>
                  `,
    eye: `
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="3" stroke="#33363F" stroke-width="2"></circle> <path d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z" stroke="#33363F" stroke-width="2"></path> </g></svg>
                  `,
    info: `
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.14939 7.8313C8.57654 5.92179 10.0064 4 12 4V4C13.9936 4 15.4235 5.92179 14.8506 7.8313L13.2873 13.0422C13.2171 13.2762 13.182 13.3932 13.128 13.4895C12.989 13.7371 12.7513 13.9139 12.4743 13.9759C12.3664 14 12.2443 14 12 14V14C11.7557 14 11.6336 14 11.5257 13.9759C11.2487 13.9139 11.011 13.7371 10.872 13.4895C10.818 13.3932 10.7829 13.2762 10.7127 13.0422L9.14939 7.8313Z" stroke="#33363F" stroke-width="2"></path> <circle cx="12" cy="19" r="2" stroke="#33363F" stroke-width="2"></circle> </g></svg>
                  `,
    box: `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package h-6 w-6" aria-hidden="true"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
                  `,
    device: `
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-smartphone h-6 w-6" aria-hidden="true"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><path d="M12 18h.01"></path></svg>
                  `,
    transactions: `
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart h-6 w-6" aria-hidden="true"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
                  `,
    trend_up: `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up h-6 w-6" aria-hidden="true"><path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path></svg>
                  `,
    add: `
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus h-4 w-4" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                  `,
};

let mock_data = null;
const mockDataReady = DEVELOP_MODE
    ? import("./mock-data.mjs").then(({mockData}) => {
        mock_data = mockData;
    })
    : Promise.resolve();

// -------------End of Global Variables----------


// =========================================================
//   SHARED HELPERS
//   Used by the router and/or by more than one page module.
//   Page-specific helpers stay next to the render*() function
//   that owns them, further down in this file.
// =========================================================

// -- Icon system --
/**
 * یک آیکون SVG را بر اساس نام از مجموعه ICONS برمی‌گرداند و اندازه، کلاس و ضخامت خط آن را تنظیم می‌کند.
 *
 * @param {string} name - نام آیکون مورد نظر (کلید موجود در آبجکت ICONS).
 * @param {Object} [options={}] - تنظیمات اختیاری برای شخصی‌سازی آیکون.
 * @param {number} [options.size=22] - اندازه (عرض و ارتفاع) آیکون بر حسب پیکسل.
 * @param {string} [options.className=""] - نام کلاس (یا کلاس‌های) CSS که به تگ svg اضافه می‌شود.
 * @param {number} [options.stroke=2] - ضخامت خط (stroke-width) آیکون.
 * @returns {string} رشته‌ی HTML/SVG آیکون با تنظیمات اعمال‌شده، یا رشته‌ی خالی در صورت پیدا نشدن آیکون.
 */
function getIcon(name, options = {}) {
    const {size = 22, className = "", stroke = 2} = options;

    let svg = ICONS[name];

    if (!svg) return "";

    svg = svg
        .replace(/width=".*?"/, `width="${size}"`)
        .replace(/height=".*?"/, `height="${size}"`)
        .replace(/stroke-width=".*?"/, `stroke-width="${stroke}"`);

    if (className) {
        svg = svg.replace("<svg", `<svg class="${className}"`);
    }

    return svg;
}

function renderIcons(container = document) {
    container.querySelectorAll("[data-icon]").forEach((el) => {
        const name = el.getAttribute("data-icon");
        const size = el.getAttribute("data-size") || 20;
        const className = el.getAttribute("data-class") || "";

        el.outerHTML = getIcon(name, {size, className});
    });
}

// -- Global loading spinner --
/**
 * نمایش یا مخفی‌کردن لودر صفحه
 * @param {boolean} show - اگر true باشد لودر نمایش داده می‌شود، در غیر این صورت مخفی می‌شود
 */
function showLoader(show) {
    loader.classList.toggle("hidden", !show);
}

// -- Dev-mode nav link --
//---- شروع بخش مخصوص تست دولوپر ----

function applyDevMode() {
    const devNavItem = document.querySelector('a[href="#/dev"]');
    if (devNavItem) {
        // اگر DEVELOP_MODE فعال نباشد، کلاس hidden اضافه می‌شود تا لینک مخفی شود
        devNavItem.classList.toggle("hidden", !DEVELOP_MODE);
    }
}

//---- پایان بخش مخصوص تست دولوپر ----

// -- Mobile nav drawer (used by every page's navbar) --
function toggleMenu() {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("overlay");

    nav.classList.toggle("active");
    overlay.classList.toggle("active");
}

window.addEventListener("hashchange", () => {
    const nav = document.getElementById("mainNav");
    const overlay = document.getElementById("overlay");

    nav.classList.remove("active");
    overlay.classList.remove("active");
});

// -- Persistent navbar user-menu dropdown (every page) --
function toggleUserMenu(event) {
    const dropdown = event?.currentTarget?.querySelector(".user-dropdown");

    dropdown.classList.toggle("open");
}

function rebootSystem() {
    if (!requirePermission(PERMISSIONS.SYSTEM_REBOOT)) return;

    showModal({
        message: "آیا از ری‌استارت سیستم مطمئن هستید؟",
        type: "reboot",
        onConfirm: async () => {
            let seconds = 10;

            showModal({
                message: `
                              <div style="text-align:center">

                                  <div class="spinner" style="margin:10px auto;"></div>

                                  <div>
                                      سیستم در حال ری‌استارت است... <br>
                                      لطفاً صبر کنید.
                                  </div>

                                  <br>

                                  <div>
                                      راه‌اندازی مجدد تا
                                      <b id="rebootCounter">${seconds}</b>
                                      ثانیه دیگر انجام می‌شود
                                  </div>

                              </div>
                          `,
                type: "reboot",
                showConfirm: false,
            });

            const interval = setInterval(() => {
                seconds--;

                const counter = document.getElementById("rebootCounter");
                if (counter) counter.textContent = seconds;

                if (seconds <= 0) {
                    clearInterval(interval);
                    location.reload();
                }
            }, 1000);
        },
    });
}

// -- Generic collapsible drawer (info / settings / factory / service-configuration pages) --
function toggleDrawer(id) {
    const el = document.getElementById(id);
    const allDrawers = document.querySelectorAll(".drawer-content");

    allDrawers.forEach((d) => {
        if (d.id !== id) d.style.display = "none";
    });

    el.style.display = el.style.display === "block" ? "none" : "block";
}

// -- Generic confirm/action modal (balance / clients / factory / prices / settings pages) --
/**
 * یک مودال (پنجره‌ی گفتگو) سفارشی روی صفحه نمایش می‌دهد که می‌تواند
 * پیام، آیکون متناسب با نوع، دکمه‌های تایید/لغو و محتوای HTML اضافی داشته باشد.
 *
 * @param {Object} params - تنظیمات مودال.
 * @param {string} [params.message=""] - متن پیامی که داخل مودال نمایش داده می‌شود (پشتیبانی از HTML).
 * @param {"info"|"noType"|"success"|"warning"|"danger"|"reboot"} [params.type="info"] - نوع مودال که رنگ و آیکون آن را مشخص می‌کند.
 * @param {?Function} [params.onConfirm=null] - تابعی که با کلیک روی دکمه‌ی «تایید» اجرا می‌شود؛ خود المان مودال به‌عنوان آرگومان به آن پاس داده می‌شود.
 * @param {?Function} [params.onCancel=null] - تابعی که با کلیک روی دکمه‌ی «لغو» اجرا می‌شود.
 * @param {boolean} [params.showConfirm=true] - در صورت true بودن، دکمه‌های تایید و لغو نمایش داده می‌شوند.
 * @param {string} [params.extraHtml=""] - محتوای HTML اضافی که بین پیام و دکمه‌ها درج می‌شود (مثلاً فرم یا توضیحات بیشتر).
 * @returns {void}
 */
function showModal(options) {
    return showSharedModal({...options, getIcon});
}

// -- Router support --
function updateActiveNav(route) {
    document.querySelectorAll(".nav-item").forEach((el) => {
        el.classList.toggle("active", el.getAttribute("href") === route);
    });
}

function updateNotifBadge(count) {
    const badges = document.querySelectorAll(".notif-badge");

    badges.forEach((badge) => {
        if (count > 0) {
            badge.textContent = count;
            badge.classList.remove("hidden");
        } else {
            badge.classList.add("hidden");
        }
    });
}

// -- Core network / notification / session infra --
// --- Helper Functions ---

async function api(url, method = "GET", data = null) {
    return requestWithAuth(url, {
        method,
        data,
        token: getAuthToken(),
        onUnauthorized: () => {
            showToast("error", "401", "دسترسی غیر مجاز ❌");
            setTimeout(() => {
                logout();
            }, 1000);
        },
        onForbidden: (errorMessage) => {
            showToast("error", "عدم دسترسی", errorMessage);
        },
        onError: (error) => {
            if (error.isServerError) {
                showToast("error", `${error.statusCode}`, error.message);
                return;
            }

            showToast("error", "خطا", error.message || "خطایی رخ داد");
        },
    });
}

/**
 * Toast Notification System
 * @param {'success' | 'warning' | 'info' | 'error'} type
 * @param {string} title
 * @param {string} message
 * @param {number} timeout
 */
function showToast(type = "info", title = "اعلان", message = "", timeout = 5000) {
    let stack = document.getElementById("toastStack");

    if (!stack) {
        stack = document.createElement("div");
        stack.id = "toastStack";
        stack.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 9999;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                pointer-events: none;
            `;
        document.body.appendChild(stack);
    }

    const el = document.createElement("div");
    el.className = `toast toast-${type}`;
    el.style.cssText = `
            min-width: 280px;
            max-width: 90vw;
            background: #fff;
            color: #222;
            border-radius: 14px;
            box-shadow: 0 10px 30px rgba(0,0,0,.15);
            padding: 14px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            pointer-events: auto;
            transition: transform .25s ease, opacity .25s ease;
            touch-action: pan-y;
            border-right: 4px solid #3b82f6;
        `;

    const colors = {
        success: "#22c55e",
        error: "#ef4444",
        warning: "#f59e0b",
        info: "#3b82f6"
    };

    el.style.borderRightColor = colors[type] || colors.info;

    el.innerHTML = `
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message" >${message}</div>
            </div>
            <button class="toast-close" aria-label="close" >✕</button>
        `;

    let closed = false;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const close = () => {
        if (closed) return;
        closed = true;
        el.style.opacity = "0";
        el.style.transform = "translateY(-10px) scale(.96)";
        setTimeout(() => el.remove(), 250);
    };

    const swipeClose = (direction) => {
        if (closed) return;
        closed = true;
        el.style.opacity = "0";
        el.style.transform = `translateX(${direction > 0 ? 120 : -120}px)`;
        setTimeout(() => el.remove(), 250);
    };

    el.querySelector(".toast-close").addEventListener("click", close);

    el.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        currentX = startX;
        isDragging = true;
        el.style.transition = "none";
    });

    el.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;

        el.style.transform = `translateX(${diffX}px)`;
        el.style.opacity = `${Math.max(0.4, 1 - Math.abs(diffX) / 200)}`;
    });

    el.addEventListener("touchend", () => {
        if (!isDragging) return;
        isDragging = false;

        const diffX = currentX - startX;
        el.style.transition = "transform .25s ease, opacity .25s ease";

        if (Math.abs(diffX) > 80) {
            swipeClose(diffX);
        } else {
            el.style.transform = "translateX(0)";
            el.style.opacity = "1";
        }
    });

    stack.appendChild(el);

    if (timeout > 0) {
        setTimeout(close, timeout);
    }
}

async function logout() {
    if (logoutInProgress) return;
    logoutInProgress = true;

    const token = getAuthToken();
    let timeoutId = null;

    try {
        if (!DEVELOP_MODE && token) {
            const timeoutPromise = new Promise((resolve) => {
                timeoutId = setTimeout(resolve, 3000);
            });

            await Promise.race([
                api("/api/logout", "POST"),
                timeoutPromise,
            ]);
        }
    } catch (error) {
        console.warn("Logout API request failed:", error);
    } finally {
        if (timeoutId) clearTimeout(timeoutId);
        currentUser = null;
        accessInitializationPromise = null;
        clearAuthSession();
        window.location.href = "index.html";
    }
}

// =========================================================
//   ROUTER / APP BOOTSTRAP
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    renderIcons();

    // محتوای صفحه‌ها داینامیک ساخته می‌شود؛ پس دسترسی المان‌های جدید نیز بررسی می‌شود.
    const permissionObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.matches?.("[data-permission]")) applyPermissionVisibility(node.parentElement);
                    else applyPermissionVisibility(node);
                }
            });
        });
    });
    permissionObserver.observe(app, {childList: true, subtree: true});
})


// ====================  (Routing) ====================

applyDevMode();

window.addEventListener("hashchange", router);

window.addEventListener("load", router);

async function router() {
    const token = getAuthToken();

    if (!token) {
        window.location.href = "index.html";
        return;
    }

    await mockDataReady;

    // قبل از نمایش هر صفحه باید Permissionهای کاربر از بک‌اند دریافت شده باشند.
    try {
        await ensureAccessInitialized();
    } catch (error) {
        console.error("initializeAccessControl error:", error);
        renderError(403, "دریافت سطح دسترسی کاربر انجام نشد.");
        return;
    }

    const {route, status} = resolveRoute(location.hash, {developMode: DEVELOP_MODE});

    if (route === lastRoute) return;
    lastRoute = route;

    if (status === "not-found") {
        renderError(404);
        return;
    }

    // ورود مستقیم با URL نیز بدون Permission امکان‌پذیر نیست.
    const requiredPermission = ROUTE_PERMISSIONS[route];
    if (requiredPermission && !hasPermission(requiredPermission)) {
        renderError(403, "شما اجازه مشاهده این بخش را ندارید.");
        return;
    }

    updateActiveNav(route);

    if (ws) {
        ws.close();
        ws = null;
    }


    await runRouteHandler(route, {
        "#/": renderDashboard,
        "#/notifications": renderNotifications,
        "#/prices": renderPrices,
        "#/clients": renderClients,
        "#/balance": renderBalance,
        "#/settings": renderSettings,
        "#/factory": renderFactory,
        "#/logs": renderLogs,
        "#/info": renderInfo,
        "#/service-configuration": renderServiceConfiguration,
        "#/dev": renderDevelop,
        notFound: () => renderError(404),
    });
}


// --- View Handlers  ---

function getSalesTrendData(period = "week") {
    return createSalesTrendData(dashboardRawData, period);
}

async function renderDashboard() {

    // Badge اعلان‌ها فقط در صورت داشتن مجوز مشاهده اعلان‌ها به‌روزرسانی می‌شود.
    if (hasPermission(PERMISSIONS.NOTIFICATIONS_VIEW)) {
        await renderNotifications();
    } else {
        updateNotifBadge(0);
    }

    if (DEVELOP_MODE) {
        renderDashboardData = mock_data.dashboard;
    } else {
        showLoader(true);
        renderDashboardData = await api("/api/dashboard") || {};
        showLoader(false);
    }


    dashboardRawData = renderDashboardData;
    const data = mapDashboardData(renderDashboardData, {formatApiDateTime});

    const time = formatDateTime();
    const salesTrend = getSalesTrendData(salesTrendPeriod);

    app.innerHTML = renderDashboardPageShell({
        data,
        isDevelopMode: DEVELOP_MODE,
        salesTrend,
        time,
        icons: {
            box: getIcon("box"),
            device: getIcon("device"),
            download: getIcon("download"),
            server: getIcon("server"),
            setting: getIcon("setting"),
            transactions: getIcon("transactions"),
            trendUp: getIcon("trend_up"),
            wifi: getIcon("wifi"),
        },
        formatNumber,
        safeText: safe,
    });

    renderSalesTrendChart(document.getElementById("salesTrendChart"), {
        trendData: salesTrend,
        selectedPeriod: salesTrendPeriod,
        onPeriodChange: (period) => {
            salesTrendPeriod = period;
            renderDashboard();
        },
        formatApiDateTime,
        formatNumber,
        safeText: safe,
    });
    bindDashboardPageEvents(app, {
        onDevBadgeClick: () => showToast("success", "", "خسته نباشی 👋"),
        onDownloadReport: () => downloadReport(data),
        onVolumeInput: setVolume,
    });

    startClock();
}

function setVolume(val) {
    if (!requirePermission(PERMISSIONS.DEVICE_VOLUME_UPDATE)) return;

    document.getElementById("volumeValue").innerText = val + "%";

    clearTimeout(volumeTimeout);

    volumeTimeout = setTimeout(async () => {
        await api("/api/device/volume", "POST", {volume: val});
    }, 1000);
}

function formatDateTime() {
    const now = new Date();

    const gregorianDate = new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(now);

    const gregorianTime = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(now);

    const jalaliDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(now);

    const jalaliTime = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(now);

    return {
        gregorian: `${gregorianDate} | ${gregorianTime}`,
        jalali: `${jalaliDate} | ${jalaliTime}`,
    };
}

function startClock() {
    function update() {
        const time = formatDateTime();

        const g = document.querySelector(".time-greg");
        const j = document.querySelector(".time-jalali");

        if (g) g.textContent = time.gregorian;
        if (j) j.textContent = time.jalali;
    }

    update();
    setInterval(update, 3000);
}

function downloadReport(data) {
    if (!requirePermission(PERMISSIONS.DASHBOARD_REPORT_EXPORT)) return;

    // const blob = new Blob(
    //     [JSON.stringify(data, null, 2)],
    //     {type: "application/json"}
    // );
    //
    // const url = URL.createObjectURL(blob);
    //
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = "device-report.json";
    // a.click();
    //
    // URL.revokeObjectURL(url);

    showToast("warning", "توجه", "این بخش در حال توسعه میباشد 👽");
}

async function renderNotifications() {
    let payload;

    if (DEVELOP_MODE) {
        payload = {
            notifications: (mock_data.dashboard?.notifications || []).map((notification, index) => ({
                id: notification.id ?? index + 1,
                ...notification,
                read: notification.read ?? false,
            })),
        };
    } else {
        showLoader(true);
        payload = await api("/api/notifications");
        showLoader(false);
    }

    const notifications = getNotificationsFromPayload(payload);

    updateNotifBadge(countUnreadNotifications(notifications));

    app.innerHTML = renderNotificationsPageShell({bellIcon: getIcon("bell")});
    bindNotificationsPageEvents(app, {onMarkRead: markNotificationsRead});

    const list = document.getElementById("notificationsList");

    renderNotificationItems(list, notifications, {safeText: safe});
}

async function markNotificationsRead() {
    if (!requirePermission(PERMISSIONS.NOTIFICATIONS_MARK_READ)) return;

    showLoader(true);

    try {
        const res = await api("/api/notifications/read-all", "POST");

        if (!res?.success) {
            throw new Error(res?.message || "تغییر وضعیت اعلان‌ها انجام نشد.");
        }

        document.querySelectorAll(".notification-item").forEach((item) => {
            item.classList.add("is-read");
        });
        updateNotifBadge(0);

        showToast(
            "success",
            "موفق",
            "وضعیت همه پیام‌ها به خوانده‌شده تغییر کرد.",
            3000,
        );
    } catch (err) {
        showToast(
            "error",
            "خطا در اعلان‌ها",
            err?.message || "امکان تغییر وضعیت اعلان‌ها وجود ندارد. دوباره تلاش کنید.",
            5000,
        );
    } finally {
        showLoader(false);
    }
}

async function renderClients() {

    if (DEVELOP_MODE) {
        renderClientsData = mock_data.clients
    } else {
        showLoader(true);
        try {
            const clients = await api("/api/clients");
            renderClientsData = clients && typeof clients === "object" && !Array.isArray(clients)
                ? clients
                : {};
        } finally {
            showLoader(false);
        }
    }

    app.innerHTML = `
                  <div class="card" style="padding-bottom: 80px">

                      <div style="display: flex; align-items: center; justify-content: start; gap: 10px">
                          ${getIcon("users")}
                          <h2>مدیریت کاربران</h2>
                     </div>

                      <div class="table-responsive">
                          <table>
                              <thead>
                                  <tr>
                                      <th class="col-index">#</th>
                                      <th class="col-name">نام</th>
                                      <th class="col-id">ID</th>
                                      <th class="col-status">وضعیت</th>
                                      <th class="col-settings">عملیات</th>
                                  </tr>
                              </thead>
                              <tbody id="clientsTable"></tbody>
                          </table>
                      </div>

                  </div>

                  <div class="page-action-bar">
                     <button class="btn" data-client-add data-permission="clients.create">${getIcon("add")}افزودن کاربر جدید</button>
                      <button class="btn btn-outline" data-client-back>بازگشت</button>
                  </div>
                  `;

    const table = document.getElementById("clientsTable");
    bindClientPageEvents(app, {
        onAddClient: addNewClient,
        onBack: () => {
            location.hash = "#/";
        },
    });
    renderClientTableRows(table, renderClientsData, {
        warning: getIcon("warning"),
        setting: getIcon("setting"),
    });
    bindClientTableEvents(table, {
        onOpenSettings: openClientsAdvancedSettings,
    });
}

function openClientsAdvancedSettings(key) {
    if (!requirePermission(PERMISSIONS.CLIENTS_UPDATE)) return;

    const rowData = renderClientsData[key];
    if (!rowData) return;


    const modalBody = renderClientAdvancedModalBody({
        key,
        rowData,
        userIcon: getIcon("users"),
    });

    const modal = showModal({
        message: modalBody,
        type: "noType",
        onConfirm: async (modal) => {
            const id = document.getElementById("modalId").value.trim();
            const name = document.getElementById("modalName").value.trim();
            const isActive = document.getElementById("modalVisible").checked;

            const validationError = validateClientForm({name, id});
            if (validationError) {
                showToast("error", "خطا", validationError);
                return;
            }

            const finalData = {
                id,
                name,
                status: getClientApiStatus(isActive),
            };

            showLoader(true);
            try {
                if (DEVELOP_MODE) {
                    renderClientsData[key] = {...renderClientsData[key], ...finalData};
                } else {
                    const response = await api(
                        `/api/clients/${encodeURIComponent(key)}`,
                        "PUT",
                        finalData,
                    );
                    if (response.success) {
                        await renderClients();

                        modal.remove();
                        showToast("success", "موفق", "اطلاعات کاربر با موفقیت ویرایش شد.");
                    }
                }


            } catch (err) {
                showToast(
                    "error",
                    "خطا",
                    "ذخیره تغییرات با خطا مواجه شد ❌",
                );
            } finally {
                showLoader(false);
            }
        },
    });
    bindClientAdvancedModalEvents(modal, {
        onDelete: deleteClient,
    });
}

async function deleteClient(key) {
    if (!requirePermission(PERMISSIONS.CLIENTS_DELETE)) return;

    const rowData = renderClientsData[key];
    if (!rowData) return;

    showModal({
        message: `آیا از حذف کاربر «${rowData.name || rowData.id || ""}» مطمئن هستید؟`,
        type: "danger",
        onConfirm: async (modal) => {
            showLoader(true);
            try {
                if (DEVELOP_MODE) {
                    delete renderClientsData[key];
                } else {
                    const response = await api(
                        `/api/clients/${encodeURIComponent(key)}`,
                        "DELETE",
                    );
                    if (response?.success !== true) {
                        throw new Error("CLIENT_DELETE_FAILED");
                    }
                }

                await renderClients();
                document.querySelectorAll(".app-modal").forEach((item) => item.remove());
                showToast(
                    "success",
                    "حذف",
                    "حذف کاربر با موفقیت انجام شد ✅",
                );
            } catch (err) {
                showToast(
                    "error",
                    "خطا",
                    "حذف کاربر با خطا مواجه شد ❌",
                );
            } finally {
                showLoader(false);
            }
        },
    });
}

async function addNewClient() {
    if (!requirePermission(PERMISSIONS.CLIENTS_CREATE)) return;

    const modalBody = renderClientCreateModalBody({
        userIcon: getIcon("users"),
    });

    const modal = showModal({
        message: modalBody,
        type: "noType",
        onConfirm: async (modal) => {
            const name = document.getElementById("modalName").value.trim();
            const id = document.getElementById("modalId").value.trim();
            const status = getClientApiStatus(document.getElementById("modalVisible").checked);

            const validationError = validateClientForm({name, id}, CLIENT_MESSAGES.requiredNameAndPersianId);
            if (validationError) {
                showToast(
                    "error",
                    "خطا",
                    validationError,
                );
                return;
            }

            const finalData = {name, id, status};

            showLoader(true);
            try {
                if (DEVELOP_MODE) {
                    const newKey = `client_${Date.now()}`;
                    renderClientsData[newKey] = finalData;
                } else {
                    const response = await api("/api/clients", "POST", finalData);

                    if (response.success) {
                        modal.remove();
                        await renderClients();
                        showToast("success", "موفق", "کاربر جدید با موفقیت اضافه شد.");
                    }

                }

            } catch (err) {
                showToast(
                    "error",
                    "خطا",
                    "افزودن کاربر با خطا مواجه شد ❌",
                );
            } finally {
                showLoader(false);
            }
        },
    });
    bindClientAdvancedModalEvents(modal, {
        onDelete: deleteClient,
    });
}

async function renderBalance() {

    if (DEVELOP_MODE) {
        renderBalanceData = mock_data.balance
    } else {
        showLoader(true);
        renderBalanceData = await api("/api/balance");
        showLoader(false);
    }

    const clients = renderBalanceData || [];

    app.innerHTML = renderBalancePageShell({
        clients,
        payIcon: getIcon("pay"),
    });
    bindBalancePageEvents(app, {
        onApplyAll: () => applyBalanceToAll(clients.length),
        onSave: () => confirmSave(clients.length),
        onExport: downloadBalanceCSV,
    });
}

function applyBalanceToAll(count) {
    if (!requirePermission(PERMISSIONS.BALANCE_UPDATE)) return;

    const value = document.getElementById("globalBalanceInput").value;

    const validationError = validateGlobalBalance(value);
    if (validationError) {
        showToast("warning", "توجه", validationError);
        return;
    }

    for (let i = 0; i < count; i++) {
        const input = document.getElementById("balance" + i);

        if (input) input.value = value;
    }
}

async function submitAllBalances(count) {
    if (!requirePermission(PERMISSIONS.BALANCE_UPDATE)) return false;

    const updates = [];

    for (let i = 0; i < count; i++) {
        const input = document.getElementById("balance" + i);
        const idCell = document.getElementById("clientId" + i);

        if (input && idCell) {
            updates.push(createBalanceUpdate(idCell.innerText, input.value));
        }
    }

    showLoader(true);

    const res = await api("/api/balance", "POST", updates);

    showLoader(false);

    if (res?.success) {
        showToast("success", "موفق", "اطلاعات با موفقیت ذخیره شد", 7000);

        await renderBalance();
    } else {
        showToast("error", "خطا", "خطا در برقراری ارتباط با سرور", 4000);
    }
}

function confirmSave(count) {
    showModal({
        message: "آیا مطمئن هستید که می‌خواهید تغییرات موجودی ذخیره شود؟",
        type: "warning",
        onConfirm: async (modal) => {
            await submitAllBalances(count);
            modal.remove();
        },
    });
}

async function downloadBalanceCSV() {
    if (!requirePermission(PERMISSIONS.BALANCE_EXPORT)) return;

    showLoader(true);

    try {
        const csvBlob = await api("/api/balance-export");

        if (!isCsvBlob(csvBlob)) {
            throw new TypeError("پاسخ سرور فایل CSV نیست.");
        }

        const downloadUrl = URL.createObjectURL(csvBlob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "clients_balance.csv";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(downloadUrl);

        showToast("success", "موفق", "فایل موجودی با موفقیت دریافت شد.");
    } catch (error) {
        console.error("downloadBalanceCSV error:", error);
        showToast("error", "خطا", "دریافت فایل CSV موجودی انجام نشد.");
    } finally {
        showLoader(false);
    }
}

async function renderSettings() {

    if (DEVELOP_MODE) {
        renderSettingsData = mock_data.settings
    } else {
        showLoader(true);
        renderSettingsData = (await api("/api/get-settings")) || {};
        showLoader(false);
    }


    const now = new Date();

    const defaultDate = now.toISOString().split("T")[0];
    const defaultTime = now.toTimeString().slice(0, 5);


    app.innerHTML = renderSettingsPageShell({
        data: renderSettingsData,
        defaults: {
            date: defaultDate,
            time: defaultTime,
        },
        icons: {
            add: getIcon("add"),
            eye: getIcon("eye"),
            logs: getIcon("logs"),
            pay: getIcon("pay"),
            refresh: getIcon("refresh"),
            setting: getIcon("setting"),
            wireless: getIcon("wireless"),
        },
    });

    saveInitialFormState();
    bindSettingsPageEvents(app, {
        onSubmit: saveSettings,
        onToggleDrawer: toggleDrawer,
        onToggleInput: toggleInputVisibility,
        onNavigate: handleNavigation,
        onAddWifi: addWifi,
        onScanWifi: loadWifiList,
    });

    const apPasswordInput = document.getElementById("APwifiPassword");
    const apPasswordConfirmationInput = document.getElementById("APConfwifiPassword");

    [apPasswordInput, apPasswordConfirmationInput].forEach((input) => {
        input?.addEventListener("input", () => {
            if (apPasswordInput.value === apPasswordConfirmationInput.value) {
                apPasswordConfirmationInput.setCustomValidity("");
            }
        });
    });

    // اسکن خودکار فقط برای کاربری انجام می‌شود که مجوز مشاهده شبکه‌ها را دارد.
    if (hasPermission(PERMISSIONS.WIFI_SCAN)) await loadWifiList();
}

function saveInitialFormState() {
    const form = document.getElementById("settingsForm");
    if (form) {
        initialFormState = serializeSettingsForm(new FormData(form));
    }
}

function hasFormChanged() {
    const form = document.getElementById("settingsForm");
    if (!form || !initialFormState) return false;

    const currentState = serializeSettingsForm(new FormData(form));

    return initialFormState !== currentState;
}

function validateSettingsForm(form) {
    const apPasswordInput = form.querySelector("#APwifiPassword");
    const apPasswordConfirmationInput = form.querySelector("#APConfwifiPassword");

    if (!apPasswordInput || !apPasswordConfirmationInput) return true;

    const validationError = validateApPasswordConfirmation(
        apPasswordInput.value,
        apPasswordConfirmationInput.value,
    );

    if (validationError) {
        const wifiDrawer = document.getElementById("wifi");
        if (wifiDrawer) wifiDrawer.style.display = "block";

        apPasswordConfirmationInput.setCustomValidity(validationError);
        apPasswordConfirmationInput.reportValidity();
        apPasswordConfirmationInput.focus();

        showToast(
            "error",
            "عدم تطابق رمز عبور",
            "رمز عبور جدید و تکرار آن باید دقیقاً یکسان باشند.",
        );

        return false;
    }

    apPasswordConfirmationInput.setCustomValidity("");
    return true;
}

async function submitSettingsAPI(form) {
    if (!requirePermission(PERMISSIONS.SETTINGS_UPDATE)) return false;

    if (!validateSettingsForm(form)) return false;

    showLoader(true);
    const formData = new FormData(form);
    formData.delete("confPassword");
    const payload = Object.fromEntries(formData.entries());


    const res = await api("/api/save-settings", "POST", payload);

    showLoader(false);

    if (res && res.success) {
        showToast("success", "موفق", "✅ تنظیمات با موفقیت ذخیره شد.");
        saveInitialFormState();
        return true;
    } else {
        showToast("error", "خطا", "❌ خطا در ذخیره‌سازی!");
        return false;
    }
}

async function saveSettings(e) {
    e.preventDefault();
    const form = e.target;

    if (!validateSettingsForm(form)) return;

    showModal({
        message: `
                          <div style="line-height: 1.9; text-align: right;">
                              <p>آیا این تغییرات انجام شده را تایید می‌کنید؟</p>
                          </div>
                      `,
        type: "danger",
        onConfirm: async (modal) => {
            modal.remove();
            await submitSettingsAPI(form);
        },
        onCancel: () => {
        },
    });
}

function handleNavigation(targetPath) {
    // مسیرهای داخلی تنظیمات نیز پیش از تغییر Hash بررسی می‌شوند.
    const requiredPermission = ROUTE_PERMISSIONS[targetPath];
    if (requiredPermission && !requirePermission(requiredPermission)) return;

    const form = document.getElementById("settingsForm");

    if (hasFormChanged()) {
        showModal({
            message: `
                              <div style="line-height: 1.9; text-align: right;">
                                  <p>تغییراتی در تنظیمات اعمال کرده‌اید. آیا مایلید قبل از خروج آن‌ها را ذخیره کنید؟</p>
                              </div>
                          `,
            type: "warning",
            onConfirm: async (modal) => {
                modal.remove();
                const success = await submitSettingsAPI(form);
                if (success) {
                    location.hash = targetPath;
                }
            },
            onCancel: (modal) => {
                modal.remove();
                location.hash = targetPath;
            },
        });
    } else {
        location.hash = targetPath;
    }
}

function getSignalBars(rssi) {
    const level = getWifiSignalLevel(rssi);

    return `
                  <div class="wifi-bars level-${level}">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                  </div>
                  `;
}

function addWifi() {
    if (!requirePermission(PERMISSIONS.WIFI_CONNECT)) return;

    const modal = showModal({
        message: `نام و رمز وای فای Hidden را وارد کنید `,
        extraHtml: renderHiddenWifiModalExtra({eyeIcon: getIcon("eye")}),

        onConfirm: async (modal) => {
            const ssid = modal.querySelector("#hiddenWifiSsidModal").value;
            const password = modal.querySelector("#hiddenWifiPasswordModal").value;


            if (!password)
                return showToast("warning", "", "قبل از تایید رمز را وارد کنید ");

            try {
                const result = await api("/api/wifi/connect", "POST", {
                    ssid,
                    password,
                });
                // const result = {
                //     success: false, // for test
                // };

                if (result.success) {
                    await loadWifiList();

                    modal.remove();

                    showToast("success", "", "اتصال به شبکه با موفقیت انجام شد");
                } else {
                    showToast("error", "خطا", "اتصال به شبکه ناموفق بود");
                }
            } catch (err) {
                showToast("error", "خطا", "خطا در اتصال به شبکه");
            }
        },
    });
    bindWifiModalEvents(modal, {onToggleInput: toggleInputVisibility});
}

async function loadWifiList() {
    if (!requirePermission(PERMISSIONS.WIFI_SCAN)) return;

    const container = document.getElementById("wifiList");
    if (!container) return;
    if (wifiScanInProgress) return;

    wifiScanInProgress = true;

    container.innerHTML = `
                      <div class="wifi-loading">
                          در حال اسکن شبکه‌ها...
                      </div>
    `;

    try {
        const payload = await api("/api/wifi/scan");

        if (!Array.isArray(payload?.networks)) {
            throw new TypeError("پاسخ اسکن وای‌فای دارای آرایه networks نیست.");
        }

        const networks = sortWifiNetworksBySignal(payload.networks);

        container.innerHTML = networks
            .map((net) => {
                const secureIcon = net.secure ? "🔒" : "";
                const connected = net.connected ? "wifi-connected" : "";

                return `
                                      <div class="wifi-item ${connected}"
                                           data-ssid="${net.ssid}"
                                           data-wifi-ssid="${net.ssid}">

                                          <div class="wifi-left">

                                              ${getSignalBars(net.rssi)}

                                              <div class="wifi-name">
                                                  ${net.ssid}
                                                  ${secureIcon}
                                              </div>

                                          </div>


                                          <div class="wifi-status">
                                              ${net.connected ? `متصل ` : ""}
                                          </div>

                                      </div>
                                    `;
            })
            .join("");
        bindWifiListEvents(container, {onSelectWifi: selectWifi});
    } catch (err) {

        console.log('loadWifiList err ==>', err)

        container.innerHTML = `
                          <div class="wifi-error">
                              خطا در اسکن شبکه ${getIcon("danger")}
                          </div>
                      `;
    } finally {
        wifiScanInProgress = false;
    }
}

function selectWifi(ssid) {
    if (!requirePermission(PERMISSIONS.WIFI_CONNECT)) return;

    const modal = showModal({
        message: `رمز شبکه <b>${ssid}</b> را وارد کنید`,
        extraHtml: renderWifiPasswordModalExtra({eyeIcon: getIcon("eye")}),

        onConfirm: async (modal) => {
            const passInput = modal.querySelector("#wifiPasswordModal");
            const password = passInput.value;

            if (!password)
                return showToast("warning", "", "قبل از تایید رمز را وارد کنید ");

            try {
                const result = await api("/api/wifi/connect", "POST", {
                    ssid,
                    password,
                });
                // const result = {
                //     success: true, // for test
                // };

                if (result.success) {
                    applySelectedWifi(ssid, password);

                    modal.remove();

                    showToast("success", "", "اتصال به شبکه با موفقیت انجام شد");
                } else {
                    showToast("error", "خطا", "اتصال به شبکه ناموفق بود");
                }
            } catch (err) {
                showToast("error", "خطا", "خطا در اتصال به شبکه");
            }
        },
    });
    bindWifiModalEvents(modal, {onToggleInput: toggleInputVisibility});
}

function applySelectedWifi(ssid, password) {
    document.getElementById("wifiSSID").value = ssid;

    document.querySelector("input[name='wifiPassword']").value = password;

    document
        .querySelectorAll(".wifi-item")
        .forEach((el) => el.classList.remove("selected"));

    const el = [...document.querySelectorAll(".wifi-item")].find(
        (x) => x.dataset?.ssid === ssid,
    );

    if (el) el.classList.add("selected");
}

function toggleInputVisibility(inputId, visibleType = "text") {
    const input = document.getElementById(inputId);
    if (!input) return;

    if (!input.dataset.originalType) {
        input.dataset.originalType = input.type;
    }

    input.type =
        input.type === input.dataset.originalType
            ? visibleType
            : input.dataset.originalType;
}

// ==========================================
//      (SSE / Webhook Forwarder)
// ==========================================
function setupRealtimeUpdates() {
    if (DEVELOP_MODE) return;

    const eventSource = new EventSource("/api/realtime-updates");

    eventSource.onmessage = function (event) {
        const payload = JSON.parse(event.data);
        const targetKey = payload.key;
        const newQty = payload.quantity;

        if (renderPricesData[targetKey]) {
            renderPricesData[targetKey].quantity = newQty;

            showToast(
                "info",
                "اعلان",
                `[Webhook] تعداد کالا ${targetKey} به ${newQty} تغییر یافت. رندر مجدد...`,
                4000,
            );

            renderPrices();
        }
    };

    eventSource.onerror = function (err) {
        console.error("خطا در اتصال به کانال زنده سرور:", err);
        eventSource.close();
        setTimeout(setupRealtimeUpdates, 20000);
    };
}

async function renderPrices() {

    // setupRealtimeUpdates();

    if (DEVELOP_MODE) {
        renderPricesData = mock_data.prices;
    } else {
        // if (Object.keys(renderPricesData).length === 0) {
        showLoader(true);
        renderPricesData = (await api("/api/prices")) || {};
        showLoader(false);
        // }
    }

    app.innerHTML = renderPricePageShell({serverIcon: getIcon("server")});
    bindPricePageEvents(app, {
        onSave: () => savePrices("submitBtnClicked"),
        onBack: () => {
            location.hash = "#/";
        },
    });

    const table = document.getElementById("priceTable");

    renderPriceTableRows(table, renderPricesData, {
        warning: getIcon("warning"),
        setting: getIcon("setting"),
    });
    bindPriceTableEvents(table, {
        onFieldBlur: saveFieldPrice,
        onOpenSettings: openAdvancedSettings,
    });

}

function openAdvancedSettings(key) {
    if (!requirePermission(PERMISSIONS.PRICES_UPDATE)) return;

    const rowData = renderPricesData[key];

    const rowChannel = rowData.channel ?? "-";
    let rowError = rowData.error || "";
    const rowDisabledByServer = rowData.disabledByServer || "";
    const rowVisible = rowData.visible ?? true;

    const modalHint = buildAdvancedHint({
        key,
        channel: rowChannel,
        error: rowError,
        disabledByServer: rowDisabledByServer,
        visible: rowVisible,
        getAdvancedHintItems,
    });

    const modalBody = renderPriceAdvancedModalBody({
        rowData,
        modalHint,
        productIcon: getIcon("products"),
    });

    const modal = showModal({
        message: modalBody,
        type: "noType",
        onConfirm: async (modal) => {
            const finalData = createAdvancedPricePayload(rowData, {
                name: document.getElementById("modalName").value,
                barcode: document.getElementById("modalBarcode").value,
                price: document.getElementById("modalPrice").value,
                quantity: document.getElementById("modalQty").value,
                size: document.getElementById("modalSize").value,
                visible: document.getElementById("modalVisible").checked,
                gifts: [
                    document.getElementById("gift1").value.trim(),
                    document.getElementById("gift2").value.trim(),
                    document.getElementById("gift3").value.trim(),
                ],
            });

            renderPricesData[key] = {
                ...renderPricesData[key],
                ...finalData,
            };

            try {
                await savePriceItemAdvanced(rowData.id, finalData);
                renderPricesData[key] = {
                    ...renderPricesData[key],
                    ...finalData,
                };
                await renderPrices();
                modal.remove();
                return;
            } catch (err) {
                // در صورت خطا مودال بسته نمی‌شه تا کاربر متوجه شکست ذخیره‌سازی بشه
                showToast(
                    "error",
                    "خطا",
                    "ذخیره تغییرات با خطا مواجه شد ❌",
                );
            }


            await renderPrices();
            modal.remove();
        },
    });
    bindPriceAdvancedModalEvents(modal, {
        onChangeQty: changeQty,
        onPhysicalSizeChange: checkPhysicalChange,
        onResolveError: resolveChannelError,
    });
}

function changeQty(step) {
    const input = document.getElementById("modalQty");
    if (!input) return;

    input.value = applyQuantityStep(input.value, step);
}

function resolveChannelError(key) {
    if (!requirePermission(PERMISSIONS.PRICES_RESOLVE_ERROR)) return;

    if (resolvingChannelError) return;

    const row = renderPricesData[key];
    if (!row) {
        showToast("error", "خطا", "اطلاعات کانال پیدا نشد.");
        return;
    }

    showModal({
        type: "warning",
        message: `
                          <div style="text-align:right; line-height:1.9;">
                              آیا مطمئن هستید که ایراد
                              <strong>کانال ${row.channel}</strong>
                              رفع شده است؟
                              <br>
                              <small style="opacity:0.8;">
                                  با تایید شما، درخواست ثبت رفع ایراد به سرور ارسال می‌شود.
                              </small>
                          </div>
                      `,
        showConfirm: true,
        onConfirm: async (modal) => {
            if (resolvingChannelError) return;

            try {
                resolvingChannelError = true;
                showLoader(true);


                const response = await api(`/api/price-resolve-error/${row.id}`, "POST");

                if (response?.success === false) {
                    throw new Error(response.message || "ثبت رفع ایراد انجام نشد");
                }

                renderPricesData[key] = {
                    ...renderPricesData[key],
                    error: "",
                };

                const hintBox = document.getElementById("advancedHintBox");
                if (hintBox) {
                    hintBox.classList.remove("advanced-hint-error");
                    hintBox.classList.add("hidden");
                    hintBox.innerHTML = buildAdvancedHint({
                        key,
                        channel: row.channel,
                        error: "",
                        disabledByServer: row.disabledByServer,
                        visible: row.visible,
                        getAdvancedHintItems,
                    });

                    const modalVisibleCheckbox = document.getElementById("modalVisible");
                    if (modalVisibleCheckbox) modalVisibleCheckbox.disabled = false;
                }

                await renderPrices();

                if (response?.success === true) {
                    showToast(
                        "success",
                        "موفق",
                        `ایراد کانال ${row.channel} با موفقیت رفع شد.`,
                        4000,
                    );
                }

                modal.remove();

            } catch (error) {
                showToast(
                    "error",
                    "خطا",
                    error.message || "ارتباط با سرور ناموفق بود.",
                    5000,
                );
            } finally {
                resolvingChannelError = false;
                showLoader(false);
            }
        },
        onCancel: () => {
            showToast(
                "info",
                "لغو شد",
                `عملیات رفع ایراد کانال ${row.channel} لغو شد.`,
                2500,
            );
        },
    });
}

function checkPhysicalChange(event) {
    const select = event.target;
    const newValue = select.value;
    const oldValue = select.dataset.prevValue || "1";

    if (newValue === "1") {
        select.dataset.prevValue = newValue;
        return;
    }

    pendingPhysicalChange = {
        select,
        oldValue,
        newValue,
    };

    showModal({
        message: `
                              <div style="line-height: 1.9; text-align: right;">
                                  <p>شما در حال تغییر فضای اشغال شده دستگاه به <strong>${newValue}</strong> کانال هستید.</p>
                                  <p>این تغییر نیاز به اصلاح فیزیکی در دستگاه دارد. آیا این تغییر انجام شده و تایید می‌کنید؟</p>
                              </div>
                              `,
        type: "danger",
        onConfirm: async (modal) => {
            if (pendingPhysicalChange) {
                pendingPhysicalChange.select.dataset.prevValue =
                    pendingPhysicalChange.newValue;
                pendingPhysicalChange = null;
                modal.remove();
            }
        },
        onCancel: () => {
            if (pendingPhysicalChange) {
                pendingPhysicalChange.select.value =
                    pendingPhysicalChange.oldValue;
                pendingPhysicalChange.select.dataset.prevValue =
                    pendingPhysicalChange.oldValue;
                pendingPhysicalChange = null;
            }
        },
    });
}

async function renderInfo() {


    if (DEVELOP_MODE) {
        renderInfoData = mock_data.info
    } else {
        showLoader(true);
        renderInfoData = (await api("/api/info")) || {};
        showLoader(false);
    }


    app.innerHTML = renderInfoPageShell({
        data: renderInfoData,
        reportsIcon: getIcon("reports"),
    });

    bindDrawerPageEvents(app, {
        onToggleDrawer: toggleDrawer,
        onBack: () => {
            location.hash = "#/";
        },
    });

}

async function copyIconText(name) {
    const text = `\${getIcon("${name}")}`;

    await navigator.clipboard.writeText(text);

    const copied = document.getElementById("copied");
    copied.innerText = text + " copied";
    copied.style.opacity = "1";
    copied.style.transform = "translateX(-50%) translateY(0)";

    setTimeout(() => {
        copied.style.opacity = "0";
        copied.style.transform = "translateX(-50%) translateY(20px)";
    }, 1200);
}

async function renderDevelop() {
    showLoader(true);

    const iconsHTML = Object.entries(ICONS).map(([name, svg]) => `
            <div class="dev-icon-card"
                 data-dev-icon="${name}"
                 style="
                    display:flex;
                    flex-direction:column;
                    align-items:center;
                    justify-content:center;
                    gap:8px;
                    padding:16px;
                    border:1px solid #e0e0e0;
                    border-radius:12px;
                    cursor:pointer;
                    transition:all .2s ease;
                    background:#fff;
                 "
                 onmouseover="this.style.background='#f5f5f5'; this.style.transform='translateY(-2px)'"
                 onmouseout="this.style.background='#fff'; this.style.transform='translateY(0)'"
            >
                <div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;">
                    ${svg}
                </div>
                <div style="font-size:12px;color:#555;text-align:center;word-break:break-word;">
                    ${name}
                </div>
            </div>
        `).join("");

    app.innerHTML = `
            <div class="card">
                <div style="display:flex;justify-content:start;align-items:center;gap:10px">
                    ${getIcon("debug")}
                    <h2>این بخش فقط در حالت توسعه فعال میباشد 👽</h2>
                </div>
            </div>

            <div class="card">
                <div id="iconsGrid" style="
                    display:grid;
                    grid-template-columns:repeat(auto-fill, minmax(90px, 1fr));
                    gap:12px;
                ">
                    ${iconsHTML}
                </div>
            </div>

            <div id="copied" style="
                position:fixed;
                bottom:20px;
                left:50%;
                transform:translateX(-50%) translateY(20px);
                background:#222;
                color:#fff;
                padding:8px 16px;
                border-radius:8px;
                font-size:13px;
                opacity:0;
                pointer-events:none;
                transition:all .25s ease;
                z-index:9999;
            "></div>

            <div class="page-action-bar">
                <button class="btn btn-outline" data-develop-back>بازگشت</button>
            </div>
        `;

    bindDevelopPageEvents(app, {
        onCopyIcon: copyIconText,
        onBack: () => {
            location.hash = "#/";
        },
    });
    showLoader(false);
}

async function renderServiceConfiguration() {

    if (DEVELOP_MODE) {
        renderServiceConfigurationData = mock_data.service_configuration
    } else {
        showLoader(true);
        renderServiceConfigurationData = await api('/api/service/config') || {};
        showLoader(false);
    }

    app.innerHTML = renderServiceConfigurationPageShell({
        data: renderServiceConfigurationData,
        settingIcon: getIcon("setting"),
    });

    bindDrawerPageEvents(app, {
        onToggleDrawer: toggleDrawer,
        onBack: () => {
            location.hash = "#/";
        },
    });
}

async function savePrices(type = '') {
    if (!requirePermission(PERMISSIONS.PRICES_UPDATE)) return;

    const inputs = document.querySelectorAll("#priceTable input");

    const result = {};

    inputs.forEach((input) => {
        const key = input.dataset.key;
        const field = input.dataset.field;

        if (!result[key]) result[key] = {};

        result[key][field] = input.value;
    });

    showLoader(true);

    const res = await api("/api/prices", "POST", result);

    showLoader(false);
    if (type === "submitBtnClicked") {
        if (res && res.success) {
            showToast("success", "موفق", "✅ قیمت‌ها ذخیره شدند");
        } else {
            showToast("error", "خطا", "❌ خطا در ذخیره قیمت‌ها");
        }
    }
}

async function savePriceItemAdvanced(id, payload) {
    if (!requirePermission(PERMISSIONS.PRICES_UPDATE)) return {};
    return api(`/api/prices/${id}`, "PUT", payload);
}

async function saveFieldPrice(input) {
    if (!requirePermission(PERMISSIONS.PRICES_UPDATE)) return;

    const key = input.dataset.key;
    const field = input.dataset.field;
    const rowData = renderPricesData[key];

    if (!rowData) return;

    const value = input.type === "number" ? Number(input.value || 0) : input.value.trim();

    try {
        await api(`/api/prices/${rowData.id}`, "PATCH", {[field]: value});
        rowData[field] = value;
        flashInputBorder(input, true);
    } catch (err) {
        flashInputBorder(input, false);
    }
}

function flashInputBorder(input, success) {
    input.style.borderColor = success ? "#22c55e" : "#ef4444";
    // setTimeout(() => {
    //     input.style.borderColor = "";
    // }, 3600);
}

document.addEventListener("click", function (e) {
    document.querySelectorAll(".user-dropdown").forEach((drop) => {
        if (!drop.parentElement.contains(e.target)) {
            drop.classList.remove("open");
        }
    });
});

async function renderFactory() {


    if (DEVELOP_MODE) {
        renderFactoryData = mock_data.factory
    } else {
        showLoader(true);
        renderFactoryData = (await api("/api/factory"));
        showLoader(false);
    }

    const config = renderFactoryData;

    app.innerHTML = renderFactoryPageShell(config);

    generateFactoryCode();
    bindFactoryPageEvents(app, {
        onToggleDrawer: toggleDrawer,
        onToggleManualIp: toggleManualIpFields,
        onToggleCert: toggleCert,
        onGenerateCode: generateFactoryCode,
        onSave: saveFactorySettings,
        onReset: resetFactoryToDefault,
        onBack: () => {
            location.href = "#/settings";
        },
    });
}

function toggleManualIpFields() {
    updateManualIpFields({
        isChecked: document.getElementById("manualIpToggle").checked,
        fields: document.getElementById("manualIpFields"),
    });
}

function toggleCert(type) {
    updateCertificateField({
        isAuto: document.getElementById(type + "Auto").checked,
        field: document.getElementById(type + "Cert"),
    });
}

function generateFactoryCode() {
    const code = Math.floor(1000 + Math.random() * 9000);
    document.getElementById("authCode").innerText = code;
}

async function saveFactorySettings() {
    if (!requirePermission(PERMISSIONS.FACTORY_UPDATE)) return;

    const form = document.getElementById("factoryForm");
    const data = createFactoryPayload(form, {
        useStatic: document.getElementById("manualIpToggle").checked,
        mqttAuto: document.getElementById("mqttAuto").checked,
    });

    showLoader(true);
    const res = await api("/api/factory-save", "POST", data);
    showLoader(false);

    if (res && res.success) {
        showToast(
            "success",
            "موفق",
            "✅ تنظیمات کارخانه با موفقیت ذخیره شد.",
        );
    } else {
        showToast(
            "error",
            "خطا",
            "❌ خطا در ذخیره. احتمالاً کد تایید اشتباه است.",
        );
    }
}

async function resetFactoryToDefault() {
    if (!requirePermission(PERMISSIONS.FACTORY_RESET)) return;

    showModal({
        message:
            "آیا مطمئن هستید که می‌خواهید تمام تنظیمات را به حالت اول برگردانید؟ این عمل غیرقابل بازگشت است!",
        type: "danger",
        onConfirm: async (modal) => {
            showLoader(true);
            const res = await api("/api/factory-reset", "POST", {
                confirm: true,
            });

            showLoader(false);

            if (res.success) {
                modal.remove();

                showToast(
                    "success",
                    "موفق",
                    "✅ تنظیمات کارخانه با موفقیت ریست شد .",
                );

                await renderFactory()

            } else {
                showToast("error", "خطا", "❌ خطا در اتصال به سرور");
            }
        },
    });
}

function renderLogs() {
    app.innerHTML = renderLogsPageShell({logsIcon: getIcon("logs")});

    bindDrawerPageEvents(app, {
        onToggleDrawer: toggleDrawer,
        onBack: () => {
            location.href = "#/settings";
        },
    });

    const websocketProtocol = location.protocol === "https:" ? "wss:" : "ws:";
    const socket = new WebSocket(`${websocketProtocol}//${location.host}/ws`);
    ws = socket;

    const setConnectionStatus = (message) => {
        const status = document.getElementById("logConnectionStatus");
        if (status && ws === socket) status.textContent = message;
    };

    socket.addEventListener("open", () => {
        setConnectionStatus("اتصال به سرویس لاگ برقرار است.");
    });

    socket.addEventListener("message", (event) => {
        const logArea = document.getElementById("logArea");
        if (!logArea || ws !== socket) return;

        const logLine = document.createElement("div");
        const time = new Date().toLocaleTimeString("fa-IR");
        logLine.textContent = `[${time}] ${String(event.data)}`;
        logArea.appendChild(logLine);

        while (logArea.childElementCount > 500) {
            logArea.firstElementChild.remove();
        }

        logArea.scrollTop = logArea.scrollHeight;
    });

    socket.addEventListener("error", () => {
        setConnectionStatus("خطا در اتصال به سرویس لاگ.");
    });

    socket.addEventListener("close", () => {
        if (ws !== socket) return;
        setConnectionStatus("اتصال سرویس لاگ قطع شد.");
        ws = null;
    });

}

function renderError(code, message = "صفحه مورد نظر پیدا نشد!") {
    app.innerHTML = `
                  <div class="card" style="text-align:center"><h1>${code}
                  </h1><p>${message}</p></div>
                      `;
}

Object.assign(window, {
    addNewClient,
    applyBalanceToAll,
    addWifi,
    loadWifiList,
    changeQty,
    checkPhysicalChange,
    confirmSave,
    copyIconText,
    deleteClient,
    downloadBalanceCSV,
    downloadReport,
    generateFactoryCode,
    handleNavigation,
    logout,
    markNotificationsRead,
    openAdvancedSettings,
    openClientsAdvancedSettings,
    rebootSystem,
    resetFactoryToDefault,
    resolveChannelError,
    saveFactorySettings,
    saveFieldPrice,
    savePrices,
    saveSettings,
    selectWifi,
    setVolume,
    showToast,
    toggleCert,
    toggleDrawer,
    toggleInputVisibility,
    toggleManualIpFields,
    toggleMenu,
    toggleUserMenu,
});
