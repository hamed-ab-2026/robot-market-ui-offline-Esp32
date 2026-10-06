import {NOTIFICATION_STATUS_COLORS} from "./notificationRules.js";

/**
 * Renders the notifications page shell.
 */
export function renderNotificationsPageShell({bellIcon}) {
    return `
                      <div class="card">
                         <div class="notifications-header">
                           <div style="display: flex; align-items: center; justify-content: start; gap: 10px">
                              ${bellIcon}
                              <h2>اعلانات</h2>
                          </div>
                              <button class="btn btn-soft" data-notifications-mark-read data-permission="notifications.mark_read">خوانده شد ✓</button>
                         </div>

                      </div>

                      <div class="notifications-page" id="notificationsList"></div>
                  `;
}

/**
 * Appends notification cards using DOM APIs so text content stays escaped.
 */
export function renderNotificationItems(list, notifications, {safeText}) {
    if (!notifications.length) {
        list.innerHTML = `<div class="card empty-state">اعلانی برای نمایش وجود ندارد.</div>`;
        return;
    }

    notifications.forEach((notification) => {
        const item = document.createElement("article");
        item.className = "notification-item";
        item.classList.toggle("is-read", notification?.read === true);
        item.dataset.notificationId = String(notification?.id ?? "");

        const dot = document.createElement("div");
        dot.className = "notification-dot";
        dot.style.background = NOTIFICATION_STATUS_COLORS[notification?.status] || "var(--info)";

        const content = document.createElement("div");
        content.className = "notification-content";

        const title = document.createElement("strong");
        title.textContent = safeText(notification?.title);

        const message = document.createElement("p");
        message.textContent = safeText(notification?.message);

        const time = document.createElement("small");
        time.textContent = safeText(notification?.time);

        content.append(title, message, time);
        item.append(dot, content);
        list.appendChild(item);
    });
}

/**
 * Wires notifications page actions after rendering.
 */
export function bindNotificationsPageEvents(root, {onMarkRead}) {
    root.querySelector("[data-notifications-mark-read]")?.addEventListener("click", onMarkRead);
}
