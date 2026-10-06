import {describe, expect, it} from "vitest";
import {APP_MESSAGES} from "./auth.constants.js";
import {validateLogin, validatePasswordChange} from "./auth.validation.js";

describe("auth validation", () => {
    it("requires an Iranian mobile number for OTP login", () => {
        expect(validateLogin("09123456789", "", true)).toBe("");
        expect(validateLogin("123", "", true)).toBe(APP_MESSAGES.validation.invalid_mobile);
    });

    it("requires username and a minimum password length for password login", () => {
        expect(validateLogin("", "", false)).toBe(APP_MESSAGES.validation.credentials_required);
        expect(validateLogin("admin", "123", false)).toBe(APP_MESSAGES.validation.password_too_short);
        expect(validateLogin("admin", "123456", false)).toBe("");
    });

    it("validates password change fields before calling the API", () => {
        expect(validatePasswordChange({
            oldPassword: "old-password",
            newPassword: "new-password",
            confirmPassword: "different",
            username: "admin",
        })).toBe(APP_MESSAGES.validation.passwords_do_not_match);

        expect(validatePasswordChange({
            oldPassword: "old-password",
            newPassword: "new-password",
            confirmPassword: "new-password",
            username: "admin",
        })).toBe("");
    });
});
