import {describe, expect, it} from "vitest";
import {renderHiddenWifiModalExtra, renderWifiPasswordModalExtra} from "./wifiModals.js";

describe("WiFi modals", () => {
    it("renders hidden WiFi inputs without inline handlers", () => {
        const html = renderHiddenWifiModalExtra({eyeIcon: "<span>eye</span>"});

        expect(html).toContain("hiddenWifiSsidModal");
        expect(html).toContain('data-modal-toggle-input="hiddenWifiPasswordModal"');
        expect(html).not.toContain("onclick=");
    });

    it("renders password modal toggle without inline handlers", () => {
        const html = renderWifiPasswordModalExtra({eyeIcon: "<span>eye</span>"});

        expect(html).toContain("wifiPasswordModal");
        expect(html).toContain('data-modal-toggle-input="wifiPasswordModal"');
        expect(html).not.toContain("onclick=");
    });
});
