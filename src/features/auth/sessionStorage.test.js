import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {
    clearAuthSession,
    clearPasswordChangeUsername,
    getAuthToken,
    getPasswordChangeUsername,
    saveAuthSession,
    saveAuthToken,
    savePasswordChangeUsername,
} from "./sessionStorage.js";

describe("auth session storage", () => {
    beforeEach(() => {
        const store = new Map();

        vi.stubGlobal("localStorage", {
            getItem: (key) => store.get(key) ?? null,
            setItem: (key, value) => store.set(key, String(value)),
            removeItem: (key) => store.delete(key),
            clear: () => store.clear(),
        });
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("stores and clears the auth token", () => {
        saveAuthSession("token-123", {role: "admin"});

        expect(getAuthToken()).toBe("token-123");

        clearAuthSession();

        expect(getAuthToken()).toBeNull();
    });

    it("can store only the token for OTP login", () => {
        saveAuthToken("otp-token");

        expect(getAuthToken()).toBe("otp-token");
    });

    it("stores the username used by the forced password-change flow", () => {
        savePasswordChangeUsername("admin");

        expect(getPasswordChangeUsername()).toBe("admin");

        clearPasswordChangeUsername();

        expect(getPasswordChangeUsername()).toBeNull();
    });
});
