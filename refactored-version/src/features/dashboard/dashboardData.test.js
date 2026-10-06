import {describe, expect, it} from "vitest";
import {mapDashboardData} from "./dashboardData.js";

describe("dashboard data mapping", () => {
    it("normalizes API data for dashboard rendering", () => {
        const data = mapDashboardData({
            today: {
                sales: 12000,
                transactions: 5,
                active_products: 9,
            },
            speaker: {
                volume: 25,
            },
            device: {
                info: {
                    status: "online",
                    model: "ESP32",
                    uptime: "3h",
                },
                wifi: {
                    ssid: "office",
                    rssi: -64,
                    connected: true,
                },
            },
            last_sale: {
                product: "Coffee",
                price: 12000,
                payment_method: "card",
                time: "2026-10-03T08:00:00Z",
            },
            most_sold: {
                today: {name: "Coffee", count: 3},
            },
            latest_activity: [
                {
                    title: "Sale",
                    description: "Sold item",
                    status: "success",
                    time: "2026-10-03T08:00:00Z",
                },
            ],
            warnings: [{title: "Low", message: "Stock", status: "warning"}],
            notifications: [{title: "Ready", message: "Done", status: "info"}],
            sales_chart: {week: {labels: ["Sat"]}},
        }, {
            formatApiDateTime: (value) => value || "--",
        });

        expect(data).toMatchObject({
            today_sales: 12000,
            today_transactions: 5,
            active_products: 9,
            device_status: "online",
            device_model: "ESP32",
            device_uptime: "3h",
            wifi: {
                ssid: "office",
                rssi: -64,
                connected: true,
            },
            speaker: {
                volume: 25,
                muted: false,
            },
            last_operation: {
                title: "Sale",
                status: "success",
            },
            last_sale: {
                product: "Coffee",
                price: 12000,
                payment_method: "card",
            },
        });
    });

    it("uses safe defaults for missing API sections", () => {
        const data = mapDashboardData({}, {
            formatApiDateTime: (value) => value || "--",
        });

        expect(data.today_sales).toBe(0);
        expect(data.speaker.volume).toBe(75);
        expect(data.last_sale.product).toBe("--");
        expect(data.latest_activity).toEqual([]);
    });
});
