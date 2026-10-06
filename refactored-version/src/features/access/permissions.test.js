import {describe, expect, it} from "vitest";
import {PERMISSIONS, canAccessPermission} from "./permissions.js";

describe("permissions", () => {
    it("allows every permission in development mode", () => {
        expect(canAccessPermission({
            developMode: true,
            user: null,
            permission: PERMISSIONS.FACTORY_RESET,
        })).toBe(true);
    });

    it("requires the exact backend permission in production mode", () => {
        const user = {permissions: [PERMISSIONS.DASHBOARD_VIEW]};

        expect(canAccessPermission({
            developMode: false,
            user,
            permission: PERMISSIONS.DASHBOARD_VIEW,
        })).toBe(true);

        expect(canAccessPermission({
            developMode: false,
            user,
            permission: PERMISSIONS.FACTORY_RESET,
        })).toBe(false);
    });
});
