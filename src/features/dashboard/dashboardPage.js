export function getDashboardStatusClass(status) {
    if (status === "success" || status === "online") return "status-on";
    if (status === "warning") return "status-warn";
    if (status === "info") return "status-info";
    return "status-off";
}

export function formatDashboardPaymentMethod(method, safeText) {
    if (method === "wallet") return "کیف پول";
    if (method === "cash") return "نقدی";
    if (method === "card") return "کارت";
    return safeText(method);
}

export function formatDashboardStatus(status, safeText) {
    return safeText(
        status === "success"
            ? "موفق"
            : status === "online"
                ? "فعال"
                : status === "warning"
                    ? "هشدار"
                    : status === "info"
                        ? "اطلاع"
                        : status === "error"
                            ? "خطا"
                            : status,
    );
}

export function getDashboardConnectionMeta(status, safeText) {
    const raw = String(status ?? "").toLowerCase();

    if (["success", "online", "active", "connected", "ok", "true"].includes(raw)) {
        return {cls: "connected", label: "فعال"};
    }

    if (["warning", "info", "connecting", "pending", "unknown"].includes(raw)) {
        return {cls: "warning", label: "هشدار"};
    }

    if (["error", "offline", "fail", "failed", "disconnected", "down", "false"].includes(raw)) {
        return {cls: "disconnected", label: "قطع"};
    }

    return {cls: "warning", label: safeText(status)};
}

function renderActivityItems(items, {safeText, formatStatus}) {
    if (!items.length) return `<div class="empty-state">دیتایی وجود ندارد</div>`;

    return items
        .map(
            (item) => `
                                                <div class="activity-item">
                                                    <div>
                                                        <strong>${safeText(item.title)}</strong>
                                                        <span>${safeText(item.message ?? item.description)}</span>
                                                        <small>${safeText(item.time)}</small>
                                                    </div>
                                                    <span class="status-badge ${getDashboardStatusClass(item.status)}">
                                                        ${formatStatus(item.status)}
                                                    </span>
                                                </div>
                                            `,
        )
        .join("");
}

/**
 * Builds the dashboard shell. Data loading, chart drawing, and event binding stay outside.
 */
export function renderDashboardPageShell({
    data,
    isDevelopMode,
    salesTrend,
    time,
    icons,
    formatNumber,
    safeText,
}) {
    const wifi = data.wifi || {};
    const lastOperation = data.last_operation || {};
    const deviceMeta = getDashboardConnectionMeta(data?.device_status, safeText);
    const wifiMeta = wifi.connected === true
        ? {cls: "connected", label: "متصل"}
        : wifi.connected === false
            ? {cls: "disconnected", label: "قطع"}
            : {cls: "warning", label: "نامشخص"};
    const formatStatus = (status) => formatDashboardStatus(status, safeText);

    return `
                      <div class="dashboard-container">

                      <div class="dashboard-compact">
                          <div class="dashboard-header">
                              <div class="dashboard-greeting">
                                  <div class="greeting-icon">👋</div>
                                  <div>
                                      <h2>سلام hame...:)</h2>
                                      <span>نمای کلی همه دستگاه‌ها</span>
                                  </div>
                              </div>

                  ${isDevelopMode ? `
                        <div data-dashboard-dev-badge class="dev-mode-badge">
                            <span class="dev-mode-dot"></span>
                            DEV MODE
                        </div>
                        ` : ""}


                              <div class="dashboard-date">
                                  <div class="time-jalali">${safeText(time.jalali)}</div>
                                     <div class="top-bar">
                                          <button class="btn-download" data-dashboard-download-report data-permission="dashboard.report.export">
                                              ${icons.download}
                                              گزارش فروش
                                          </button>
                                      </div>
                              </div>
                          </div>

                          <div class="mini-grid">
                                <div class="mini-card ${deviceMeta.cls}">
                                    <div class="mini-icon">${icons.server}</div>
                                    <div>
                                        <span>سیستم</span>
                                        <strong><small>${deviceMeta.label}</small></strong>
                                    </div>
                                </div>

                                <div class="mini-card ${wifiMeta.cls}">
                                    <div class="mini-icon">${icons.wifi}</div>
                                    <div>
                                        <span>WiFi ${wifi.ssid ? `(${safeText(wifi.ssid)})` : ""}</span>
                                        <strong>
                                            <small>
                                                ${safeText(wifi.rssi)}${wifi.rssi != null ? " dBm" : ""}
                                                ${wifi.connected !== "" ? ` · ${wifiMeta.label}` : ""}
                                            </small>
                                        </strong>
                                    </div>
                                </div>

                                <div class="mini-card ${deviceMeta.cls}">
                                    <div class="mini-icon">${icons.setting}</div>
                                    <div>
                                        <span>Board</span>
                                        <strong><small>v${safeText(data.device_model)}</small></strong>
                                    </div>
                                </div>
                            </div>

                      </div>

                          <div class="dashboard-compact">


                             <div class="metric-grid">

                                    <div class="metric-card">
                                        <div class="metric-icon">
                                            ${icons.box}
                                        </div>

                                        <div class="metric-content">
                                            <span class="metric-title">محصولات فعال</span>
                                            <strong class="metric-value">${formatNumber(data.active_products ?? 0)}</strong>
                                            <small class="metric-desc">در کل شبکه</small>
                                        </div>
                                    </div>

                                    <div class="metric-card">
                                        <div class="metric-icon">
                                            ${icons.device}
                                        </div>

                                        <div class="metric-content">
                                            <span class="metric-title">زمان آپتایم</span>
                                            <strong class="metric-value">${safeText(data.device_uptime)}</strong>
                                        </div>
                                    </div>

                                    <div class="metric-card">
                                        <div class="metric-icon">
                                            ${icons.transactions}
                                        </div>

                                        <div class="metric-content">
                                            <span class="metric-title">تراکنش‌ها</span>
                                            <strong class="metric-value">${formatNumber(data.today_transactions ?? 0)}</strong>
                                            <small class="metric-desc">موفق امروز</small>
                                        </div>
                                    </div>

                                    <div class="metric-card">
                                        <div class="metric-icon">
                                            ${icons.trendUp}
                                        </div>

                                        <div class="metric-content">
                                            <span class="metric-title">فروش امروز</span>
                                            <strong class="metric-value">
                                                ${formatNumber(data.today_sales ?? 0)} تومان
                                            </strong>
                                        </div>
                                    </div>

                           </div>


                                <div class="compact-card">
                                  <div class="section-title">
                                      <span>Volume</span>
                                      <small>Sound</small>
                                  </div>

                                  <div class="volume-box">
                                      <input
                                          type="range"
                                          min="0"
                                          max="100"
                                          step="25"
                                          value="${safeText(data.speaker?.volume ?? 75)}"
                                          id="volumeSlider"
                                          data-permission="device.volume.update"
                                          data-permission-mode="disable"
                                          data-dashboard-volume
                                      >
                                     <span id="volumeValue">${safeText(data.speaker?.volume ?? 75)}%</span>


                                  </div>
                              </div>

                            ${
        !!salesTrend
            ? ` <div class="compact-card sales-trend-card">
                                                                    <div id="salesTrendChart"></div>
                                                                    </div>`
            : ""
    }

                                <div class="compact-card">
                                    <div class="section-title">
                                        <span>آخرین فروش</span>
                                        <small>Last Sale</small>
                                    </div>

                                    ${
        safeText(data.last_sale.product) !== "--"
            ? `
                                                                    <div class="info-list">
                                                                        <div><strong>محصول:</strong> <span>${safeText(data.last_sale.product)}</span></div>
                                                                        <div><strong>قیمت:</strong> <span>${formatNumber(data.last_sale.price)} تومان</span></div>
                                                                        <div><strong>کانال:</strong> <span>${safeText(data.last_sale.channel)}</span></div>
                                                                        <div><strong>مشتری:</strong> <span>${safeText(data.last_sale.customer)}</span></div>
                                                                        <div><strong>پرداخت:</strong> <span>${formatDashboardPaymentMethod(data.last_sale.payment_method, safeText)}</span></div>
                                                                        <div><strong>زمان:</strong> <span>${safeText(data.last_sale.time)}</span></div>
                                                                    </div>
                                                                `
            : `<div class="empty-state">دیتایی وجود ندارد</div>`
    }
                                </div>


                                <div class="compact-card">
                                    <div class="section-title">
                                        <span>پرفروش‌ترین‌ها</span>
                                        <small>Most Sold</small>
                                    </div>

                                    ${
        safeText(data.last_sale.product) !== "--"
            ? ` <div class="info-list">
                                        <div><strong>امروز:</strong> <span>${safeText(data.most_sold.today.name)} - ${formatNumber(data.most_sold.today.count)}</span></div>
                                        <div><strong>این هفته:</strong> <span>${safeText(data.most_sold.week.name)} - ${formatNumber(data.most_sold.week.count)}</span></div>
                                        <div><strong>این ماه:</strong> <span>${safeText(data.most_sold.month.name)} - ${formatNumber(data.most_sold.month.count)}</span></div>
                                    </div>`
            : `<div class="empty-state">دیتایی وجود ندارد</div>`
    }
                                </div>


                                <div class="compact-card">
                                    <div class="section-title">
                                        <span>اعلان‌ها</span>
                                        <small>Notifications</small>
                                    </div>

                                    <div class="activity-list">
                                        ${renderActivityItems(data.notifications, {safeText, formatStatus})}
                                    </div>
                                </div>


                         </div>


                          <div class="dashboard-compact">

                              <div class="compact-card">
                                  <div class="section-title">
                                      <span>آخرین عملیات</span>
                                      <small>Result</small>
                                  </div>

                                   ${
        lastOperation.status !== "--"
            ? `<div class="last-operation">
                                        <div>
                                            <strong>${safeText(lastOperation.title)}</strong>
                                            <span>${safeText(lastOperation.time)}</span>
                                        </div>

                                        <span class="status-badge ${getDashboardStatusClass(lastOperation.status)}">
                                                              ${formatStatus(lastOperation.status)}
                                                          </span>
                                    </div>`
            : `<div class="empty-state">دیتایی وجود ندارد</div>`
    }
                              </div>


                              <div class="compact-card">
                                <div class="section-title">
                                    <span>فعالیت‌های اخیر</span>
                                    <small>Latest Activity</small>
                                </div>

                                <div class="activity-list">
                                    ${renderActivityItems(data.latest_activity, {safeText, formatStatus})}
                                </div>
                            </div>


                                <div class="compact-card">
                                    <div class="section-title">
                                        <span>هشدارها</span>
                                        <small>Warnings</small>
                                    </div>

                                    <div class="activity-list">
                                        ${renderActivityItems(data.warnings, {safeText, formatStatus})}
                                    </div>
                                </div>


                          </div>
                      </div>
                  `;
}

/**
 * Wires dashboard actions after the page is rendered.
 */
export function bindDashboardPageEvents(root, {onDevBadgeClick, onDownloadReport, onVolumeInput}) {
    root.querySelector("[data-dashboard-dev-badge]")?.addEventListener("click", onDevBadgeClick);
    root.querySelector("[data-dashboard-download-report]")?.addEventListener("click", onDownloadReport);
    root.querySelector("[data-dashboard-volume]")?.addEventListener("input", (event) => {
        onVolumeInput(event.target.value);
    });
}
