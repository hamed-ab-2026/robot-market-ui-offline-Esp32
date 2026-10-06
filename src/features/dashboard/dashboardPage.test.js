import {describe, expect, it} from "vitest";
import {
    bindDashboardPageEvents,
    formatDashboardPaymentMethod,
    getDashboardConnectionMeta,
    renderDashboardPageShell,
} from "./dashboardPage.js";

describe("dashboard page events", () => {
    it("exports the dashboard event binder", () => {
        expect(typeof bindDashboardPageEvents).toBe("function");
    });

    it("formats dashboard display rules", () => {
        const safeText = (value) => String(value ?? "--");

        expect(formatDashboardPaymentMethod("wallet", safeText)).toBe("کیف پول");
        expect(formatDashboardPaymentMethod("card", safeText)).toBe("کارت");
        expect(getDashboardConnectionMeta("offline", safeText)).toEqual({
            cls: "disconnected",
            label: "قطع",
        });
    });

    it("renders the dashboard shell with the main controls", () => {
        const html = renderDashboardPageShell({
            data: {
                active_products: 3,
                today_transactions: 2,
                today_sales: 10000,
                device_status: "online",
                device_model: "1.0",
                device_uptime: "2h",
                wifi: {
                    ssid: "office",
                    rssi: -70,
                    connected: true,
                },
                speaker: {
                    volume: 50,
                },
                last_sale: {
                    product: "Coffee",
                    price: 10000,
                    channel: "A1",
                    customer: "guest",
                    payment_method: "cash",
                    time: "08:00",
                },
                most_sold: {
                    today: {name: "Coffee", count: 2},
                    week: {name: "Tea", count: 4},
                    month: {name: "Water", count: 8},
                },
                notifications: [],
                latest_activity: [],
                warnings: [],
                last_operation: {
                    title: "Sale",
                    time: "08:00",
                    status: "success",
                },
            },
            isDevelopMode: true,
            salesTrend: {labels: ["today"]},
            time: {jalali: "امروز"},
            icons: {
                box: "<box />",
                device: "<device />",
                download: "<download />",
                server: "<server />",
                setting: "<setting />",
                transactions: "<transactions />",
                trendUp: "<trend />",
                wifi: "<wifi />",
            },
            formatNumber: (value) => String(value),
            safeText: (value) => String(value ?? "--"),
        });

        expect(html).toContain("DEV MODE");
        expect(html).toContain('data-dashboard-volume');
        expect(html).toContain('id="salesTrendChart"');
        expect(html).toContain("نقدی");
    });
});
