import {describe, expect, it} from "vitest";
import {buildSalesTrendChartHtml, createSalesTrendData, getLabelStep, getTrendPeriodLabel} from "./salesTrend.js";

describe("sales trend helpers", () => {
    it("keeps dense day labels readable", () => {
        expect(getLabelStep("day", 24)).toBe(4);
        expect(getLabelStep("week", 7)).toBe(1);
        expect(getLabelStep("month", 31)).toBe(5);
    });

    it("normalizes chart data from the dashboard API", () => {
        const trendData = createSalesTrendData({
            sales_chart: {
                week: {
                    period: "7d",
                    labels: ["Sat", "Sun"],
                    series: [{sales: [100, 200], transactions: [1, 2]}],
                    meta: {total_sales: 300},
                },
            },
        });

        expect(trendData).toMatchObject({
            period: "7d",
            currency: "IRR",
            labels: ["Sat", "Sun"],
            series: [
                {key: "sales", data: [100, 200]},
                {key: "transactions", data: [1, 2]},
            ],
            meta: {
                total_sales: 300,
                total_transactions: 0,
            },
        });
    });

    it("returns readable Persian labels for known backend periods", () => {
        expect(getTrendPeriodLabel("7d")).toBe("۷ روز گذشته");
        expect(getTrendPeriodLabel("unknown")).toBe("--");
    });

    it("builds chart markup for the renderer", () => {
        const html = buildSalesTrendChartHtml({
            trendData: {
                period: "7d",
                currency: "IRR",
                labels: ["شنبه", "یکشنبه"],
                series: [
                    {key: "sales", data: [100, 200]},
                    {key: "transactions", data: [1, 2]},
                ],
                meta: {
                    total_sales: 300,
                    total_transactions: 3,
                    from: "2026-10-01",
                    to: "2026-10-03",
                },
            },
            selectedPeriod: "week",
            formatApiDateTime: (value) => value,
            formatNumber: (value) => String(value),
            safeText: (value) => String(value ?? "--"),
        });

        expect(html).toContain("sales-trend-svg");
        expect(html).toContain("مجموع فروش");
        expect(html).toContain('data-period="month"');
    });
});
