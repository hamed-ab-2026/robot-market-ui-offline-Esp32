import {describe, expect, it} from "vitest";
import {bindSettingsPageEvents, bindWifiListEvents, renderSettingsPageShell} from "./settingsPage.js";

describe("settings page events", () => {
    it("exports the settings event binder", () => {
        expect(typeof bindSettingsPageEvents).toBe("function");
        expect(typeof bindWifiListEvents).toBe("function");
    });

    it("renders settings controls without inline event handlers", () => {
        const html = renderSettingsPageShell({
            data: {
                apSSID: "robot-ap",
                posDevice: "IRAN",
                currentDate: "2026-10-03",
                currentTime: "08:45",
            },
            defaults: {
                date: "2026-01-01",
                time: "12:00",
            },
            icons: {
                add: "<add />",
                eye: "<eye />",
                logs: "<logs />",
                pay: "<pay />",
                refresh: "<refresh />",
                setting: "<setting />",
                wireless: "<wireless />",
            },
        });

        expect(html).toContain('id="settingsForm"');
        expect(html).toContain('value="robot-ap"');
        expect(html).toContain('value="IRAN" selected');
        expect(html).toContain('data-settings-drawer="wifi"');
        expect(html).toContain('data-settings-nav="#/factory"');
        expect(html).not.toContain("onclick=");
        expect(html).not.toContain("onchange=");
    });
});
