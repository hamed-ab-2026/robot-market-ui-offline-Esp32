import {describe, expect, it} from "vitest";
import {renderPricePageShell} from "./pricePage.js";

describe("price page shell", () => {
    it("contains the product table and save action", () => {
        const html = renderPricePageShell({serverIcon: "<span>server</span>"});

        expect(html).toContain("priceTable");
        expect(html).toContain("مدیریت هوشمند کالاها");
        expect(html).toContain("data-price-save");
        expect(html).toContain("data-price-back");
    });
});
