import {describe, expect, it} from "vitest";
import {renderPriceTableRowHtml} from "./priceTable.js";

describe("price table renderer", () => {
    it("renders disabled error rows with low-stock styling", () => {
        const html = renderPriceTableRowHtml({
            key: "channel_1",
            row: {
                channel: 1,
                name: "Cola",
                quantity: 2,
                price: 45000,
                error: "Motor error",
                disabledByServer: true,
            },
            icons: {
                warning: "<span>warning</span>",
                setting: "<span>setting</span>",
            },
            state: {
                isDisabled: true,
                hasError: true,
                isLowStock: true,
            },
        });

        expect(html).toContain("stock-warning");
        expect(html).toContain("disabled");
        expect(html).toContain("warning");
        expect(html).toContain('data-price-settings="channel_1"');
        expect(html).toContain("data-price-field");
    });
});
