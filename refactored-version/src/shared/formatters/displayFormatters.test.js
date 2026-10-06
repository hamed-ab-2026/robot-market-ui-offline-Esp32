import {describe, expect, it} from "vitest";
import {formatApiDateTime, formatNumber, safeText} from "./displayFormatters.js";

describe("display formatters", () => {
    it("formats numbers with Persian digits and hides invalid values as zero", () => {
        expect(formatNumber(123456)).toBe("۱۲۳٬۴۵۶");
        expect(formatNumber("not-a-number")).toBe("۰");
    });

    it("uses a common placeholder for empty values", () => {
        expect(safeText(null)).toBe("--");
        expect(safeText("online")).toBe("online");
    });

    it("formats API dates and keeps invalid date strings visible", () => {
        expect(formatApiDateTime("", false)).toBe("--");
        expect(formatApiDateTime("not-a-date", false)).toBe("not-a-date");
    });
});
