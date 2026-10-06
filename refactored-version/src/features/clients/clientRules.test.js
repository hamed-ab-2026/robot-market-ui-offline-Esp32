import {describe, expect, it} from "vitest";
import {CLIENT_MESSAGES, getClientApiStatus, isClientActive, validateClientForm} from "./clientRules.js";

describe("client rules", () => {
    it("accepts active status from API and mock data", () => {
        expect(isClientActive("Active")).toBe(true);
        expect(isClientActive("فعال")).toBe(true);
        expect(isClientActive("Inactive")).toBe(false);
    });

    it("maps UI active state to API status", () => {
        expect(getClientApiStatus(true)).toBe("Active");
        expect(getClientApiStatus(false)).toBe("Inactive");
    });

    it("requires name and id before saving a client", () => {
        expect(validateClientForm({name: "", id: "123"})).toBe(CLIENT_MESSAGES.requiredNameAndId);
        expect(validateClientForm({name: "Ali", id: "123"})).toBe("");
    });
});
