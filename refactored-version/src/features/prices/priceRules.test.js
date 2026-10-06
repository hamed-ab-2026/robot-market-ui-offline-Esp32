import {describe, expect, it} from "vitest";
import {
    applyQuantityStep,
    createAdvancedPricePayload,
    getAdvancedHintItems,
    getPriceRowState,
    isLowStock,
} from "./priceRules.js";

describe("price rules", () => {
    it("detects low stock only for positive quantities up to three", () => {
        expect(isLowStock(0)).toBe(false);
        expect(isLowStock(1)).toBe(true);
        expect(isLowStock(3)).toBe(true);
        expect(isLowStock(4)).toBe(false);
    });

    it("summarizes row state for product channel rendering", () => {
        expect(getPriceRowState({quantity: 2, error: "jammed", disabledByServer: true, visible: false})).toEqual({
            isDisabled: true,
            hasError: true,
            isHiddenInStore: true,
            isLowStock: true,
        });
    });

    it("normalizes advanced form values for the API", () => {
        expect(createAdvancedPricePayload(
            {id: "p1", channel: 7},
            {
                name: " Cola ",
                barcode: " 123 ",
                price: "45000",
                quantity: "2",
                size: "1",
                visible: true,
                gifts: [" 10 ", "", 12],
            },
        )).toEqual({
            id: "p1",
            channel: 7,
            name: "Cola",
            barcode: "123",
            price: 45000,
            quantity: 2,
            size: 1,
            visible: true,
            gifts: ["10", "", "12"],
        });
    });

    it("applies quantity steps without allowing negative stock", () => {
        expect(applyQuantityStep("2", 1)).toBe(3);
        expect(applyQuantityStep("2", -1)).toBe(1);
        expect(applyQuantityStep("0", -1)).toBe(0);
        expect(applyQuantityStep("", -1)).toBe(0);
    });

    it("includes channel status hints for operators", () => {
        const hints = getAdvancedHintItems({
            channel: 4,
            error: "Motor error",
            disabledByServer: true,
            visible: false,
        }).join("");

        expect(hints).toContain("کانال");
        expect(hints).toContain("Motor error");
        expect(hints).toContain("نمایش داده نمی‌شود");
    });
});
