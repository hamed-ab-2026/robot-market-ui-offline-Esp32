import {describe, expect, it} from "vitest";
import {BALANCE_MESSAGES, createBalanceUpdate, isCsvBlob, validateGlobalBalance} from "./balanceRules.js";

describe("balance rules", () => {
    it("requires a value before applying balance to every row", () => {
        expect(validateGlobalBalance("")).toBe(BALANCE_MESSAGES.requiredGlobalBalance);
        expect(validateGlobalBalance("0")).toBe("");
    });

    it("creates the save payload expected by the API", () => {
        expect(createBalanceUpdate(" 42 ", "120000")).toEqual({
            id: "42",
            newBalance: 120000,
        });
    });

    it("accepts only CSV blobs for export downloads", () => {
        expect(isCsvBlob(new Blob(["id,balance"], {type: "text/csv"}))).toBe(true);
        expect(isCsvBlob(new Blob(["{}"], {type: "application/json"}))).toBe(false);
        expect(isCsvBlob("not-a-blob")).toBe(false);
    });
});
