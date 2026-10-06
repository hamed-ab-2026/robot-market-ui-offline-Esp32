/**
 * Chooses how many chart labels to skip so the x-axis stays readable.
 */
export function getLabelStep(period, totalLabels) {
    switch (period) {
        case "day":
            return Math.max(1, Math.ceil(totalLabels / 6));
        case "week":
            return 1;
        case "month":
            return 5;
        case "year":
            return 1;
        default:
            return 1;
    }
}

/**
 * Maps API chart payloads into the smaller shape consumed by the SVG renderer.
 */
export function createSalesTrendData(dashboardData, period = "week") {
    const salesChart = dashboardData?.sales_chart || {};
    const source = salesChart[period];

    if (!source) return null;

    const firstSeries = Array.isArray(source.series)
        ? source.series[0] || {}
        : {};

    return {
        period: source.period,
        currency: source.currency || "IRR",
        labels: source.labels || [],
        series: [
            {
                key: "sales",
                data: firstSeries.sales || [],
            },
            {
                key: "transactions",
                data: firstSeries.transactions || [],
            },
        ],
        meta: {
            from: source.meta?.from ?? "--",
            to: source.meta?.to ?? "--",
            total_sales: source.meta?.total_sales ?? 0,
            total_transactions: source.meta?.total_transactions ?? 0,
        },
    };
}

/**
 * Converts backend period codes to labels shown above the sales trend chart.
 */
export function getTrendPeriodLabel(period) {
    if (period === "24h") return "۲۴ ساعت گذشته";
    if (period === "7d") return "۷ روز گذشته";
    if (period === "31d") return "ماه جاری";
    if (period === "12m") return "۱۲ ماه گذشته";
    return "--";
}

function createTrendPointData({salesSeries, transactionsSeries, labels}) {
    const width = 100;
    const height = 42;
    const paddingX = 2;
    const paddingY = 4;
    const max = Math.max(...salesSeries, 1);
    const min = 0;
    const range = Math.max(max - min, 1);
    const stepX = labels.length > 1 ? (width - paddingX * 2) / (labels.length - 1) : 0;

    return salesSeries.map((value, index) => {
        const x = paddingX + index * stepX;
        const normalized = (value - min) / range;
        const y = height - paddingY - normalized * (height - paddingY * 2);

        return {
            x,
            y,
            sales: Number(value || 0),
            transactions: Number(transactionsSeries[index] || 0),
            label: labels[index] || "--",
        };
    });
}

function createSalesAreaPath(pointData) {
    const paddingX = 2;
    const height = 42;
    const paddingY = 4;
    const baseY = height - paddingY;
    const firstX = paddingX;
    const lastX = pointData.at(-1)?.x ?? paddingX;

    let path = `M ${firstX} ${baseY} `;
    path += `L ${pointData[0].x} ${pointData[0].y} `;

    for (let i = 1; i < pointData.length; i++) {
        path += `L ${pointData[i].x} ${pointData[i].y} `;
    }

    return `${path}L ${lastX} ${baseY} Z`;
}

/**
 * Builds the sales trend chart HTML so it can be tested without a browser DOM.
 */
export function buildSalesTrendChartHtml({
    trendData,
    selectedPeriod,
    formatApiDateTime,
    formatNumber,
    safeText,
}) {
    if (!trendData) return "";

    const labels = trendData.labels || [];
    const labelStep = getLabelStep(selectedPeriod, labels.length);
    const salesSeries = (trendData.series || []).find((series) => series.key === "sales")?.data || [];
    const transactionsSeries = (trendData.series || []).find((series) => series.key === "transactions")?.data || [];

    if (!salesSeries.length) {
        return `<div class="empty-state">داده‌ای برای نمایش نمودار وجود ندارد</div>`;
    }

    const width = 100;
    const height = 42;
    const pointData = createTrendPointData({salesSeries, transactionsSeries, labels});
    const points = pointData.map((point) => `${point.x},${point.y.toFixed(2)}`).join(" ");
    const areaPath = createSalesAreaPath(pointData);
    const color = "#0ea5e9";
    const gradientId = `salesGradient-${Math.random().toString(36).slice(2, 8)}`;

    return `
                <div class="sales-trend-header">
                    <div>
                        <h3>نمودار فروش</h3>
                        <small>${getTrendPeriodLabel(trendData.period)}</small>
                    </div>

                    <div class="sales-trend-switch">
                        <button type="button" class="btn btn-soft ${selectedPeriod === "day" ? "is-active" : ""}" data-period="day">
                            روز
                        </button>
                        <button type="button" class="btn btn-soft ${selectedPeriod === "week" ? "is-active" : ""}" data-period="week">
                            هفته
                        </button>
                        <button type="button" class="btn btn-soft ${selectedPeriod === "month" ? "is-active" : ""}" data-period="month">
                            ماه
                        </button>
                        <button type="button" class="btn btn-soft ${selectedPeriod === "year" ? "is-active" : ""}" data-period="year">
                            سال
                        </button>
                    </div>
                </div>

                <div class="sales-trend-chart">
                    <div class="sales-trend-tooltip"></div>

                    <svg class="sales-trend-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stop-color="${color}" stop-opacity="0.25" />
                                <stop offset="100%" stop-color="${color}" stop-opacity="0.02" />
                            </linearGradient>
                        </defs>

                        <path d="${areaPath}" fill="url(#${gradientId})" stroke="none"></path>

                        <polyline
                            points="${points}"
                            fill="none"
                            stroke="${color}"
                            stroke-width="0.3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></polyline>

                        ${pointData
        .map(
            (point) => `
                                    <g
                                        class="chart-point-group"
                                        data-label="${safeText(point.label)}"
                                        data-sales="${point.sales}"
                                        data-transactions="${point.transactions}"
                                    >
                                        <circle cx="${point.x}" cy="${point.y}" r="0.6" fill="${color}"></circle>
                                        <circle cx="${point.x}" cy="${point.y}" r="2" fill="transparent"></circle>
                                    </g>
                                `,
        )
        .join("")}
                    </svg>
                </div>

                 <div class="sales-trend-labels" style="--label-count: ${labels.length};">
                        ${labels
        .map((label, index) => {
            const isLast = index === labels.length - 1;
            const isVisible = index % labelStep === 0 || isLast;

            return `
                                    <span class="${isVisible ? "" : "is-hidden"}">
                                        ${safeText(label)}
                                    </span>
                                `;
        })
        .join("")}
                    </div>


                <div class="sales-trend-meta">
                    <div><strong>${formatNumber(trendData.meta?.total_sales || 0)}</strong><span>مجموع فروش</span></div>
                    <div><strong>${formatNumber(trendData.meta?.total_transactions || 0)}</strong><span>تراکنش</span></div>
                    <div><strong>${safeText(trendData.currency)}</strong><span>واحد</span></div>
                  <div>
                        <span>
                            <strong>${safeText(formatApiDateTime(trendData.meta?.from, false) || "--")}</strong>
                            <span style="margin: 0 4px;">تا</span>
                            <strong>${safeText(formatApiDateTime(trendData.meta?.to, false) || "--")}</strong>
                        </span>
                    </div>
                </div>
            `;
}

/**
 * Renders the interactive sales trend SVG into the provided container.
 */
export function renderSalesTrendChart(container, {
    trendData,
    selectedPeriod,
    onPeriodChange,
    formatApiDateTime,
    formatNumber,
    safeText,
}) {
    if (!container || !trendData) return;

    container.innerHTML = buildSalesTrendChartHtml({
        trendData,
        selectedPeriod,
        formatApiDateTime,
        formatNumber,
        safeText,
    });

    if (!container.querySelector(".sales-trend-svg")) return;

    container.querySelectorAll("[data-period]").forEach((button) => {
        button.addEventListener("click", () => onPeriodChange(button.dataset.period));
    });

    const chart = container.querySelector(".sales-trend-chart");
    const tooltip = container.querySelector(".sales-trend-tooltip");

    container.querySelectorAll(".chart-point-group").forEach((point) => {
        point.addEventListener("mouseenter", () => {
            const label = point.dataset.label || "--";
            const sales = formatNumber(Number(point.dataset.sales || 0));
            const transactions = formatNumber(Number(point.dataset.transactions || 0));

            tooltip.innerHTML = `
                        <div><strong>${label}</strong></div>
                        <div>فروش: ${sales}</div>
                        <div>تراکنش: ${transactions}</div>
                    `;
            tooltip.style.display = "block";
        });

        point.addEventListener("mousemove", (event) => {
            const rect = chart.getBoundingClientRect();
            tooltip.style.left = `${event.clientX - rect.left + 12}px`;
            tooltip.style.top = `${event.clientY - rect.top - 12}px`;
        });

        point.addEventListener("mouseleave", () => {
            tooltip.style.display = "none";
        });
    });
}
