import {describe, expect, it} from "vitest";
import {renderServiceConfigurationPageShell} from "./serviceConfigurationPage.js";

describe("service configuration page shell", () => {
    it("renders service configuration drawers", () => {
        const html = renderServiceConfigurationPageShell({
            settingIcon: "<span>setting</span>",
            data: {
                payment: {coin_acceptor: "on"},
                auxiliary: {},
                elevator: {},
            },
        });

        expect(html).toContain("تنظیمات سرویس دستگاه");
        expect(html).toContain('data-drawer-target="payment-config"');
        expect(html).toContain("data-page-back");
    });
});
