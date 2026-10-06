import {describe, expect, it} from "vitest";
import {DEFAULT_BARCODE} from "./priceRules.js";
import {buildAdvancedHint, renderPriceAdvancedModalBody} from "./priceAdvancedModal.js";

describe("price advanced modal", () => {
    it("renders defaults and existing row values", () => {
        const html = renderPriceAdvancedModalBody({
            rowData: {
                name: "Water",
                price: 20000,
                quantity: 3,
                channel: 5,
                size: 2,
                visible: false,
            },
            modalHint: "<div>hint</div>",
            productIcon: "<span>product</span>",
        });

        expect(html).toContain("Water");
        expect(html).toContain("20000");
        expect(html).toContain(DEFAULT_BARCODE);
        expect(html).toContain("پیکربندی کانال 5");
        expect(html).toContain("hint");
        expect(html).toContain('option value="2" selected');
        expect(html).toContain('data-qty-step="-1"');
        expect(html).toContain("data-physical-size-select");
        expect(html).not.toContain("onclick=");
        expect(html).not.toContain("onchange=");
    });

    it("adds resolve action only when channel has an error", () => {
        const getAdvancedHintItems = () => ["<p>base hint</p>"];

        const html = buildAdvancedHint({
            key: "slot_1",
            channel: 1,
            error: "jammed",
            disabledByServer: false,
            visible: true,
            getAdvancedHintItems,
        });

        expect(html).toContain("base hint");
        expect(html).toContain('data-resolve-channel-error="slot_1"');

        const cleanHtml = buildAdvancedHint({
            key: "slot_1",
            channel: 1,
            error: "",
            disabledByServer: false,
            visible: true,
            getAdvancedHintItems,
        });

        expect(cleanHtml).toContain("base hint");
        expect(cleanHtml).not.toContain("data-resolve-channel-error");
    });
});
