import {describe, expect, it} from "vitest";
import {
    SETTINGS_MESSAGES,
    getWifiSignalLevel,
    serializeSettingsForm,
    sortWifiNetworksBySignal,
    validateApPasswordConfirmation,
} from "./settingsRules.js";

describe("settings rules", () => {
    it("serializes settings form data for change detection", () => {
        const formData = new FormData();
        formData.set("apSSID", "RobotMarket");
        formData.set("setTime", "12:30");

        expect(serializeSettingsForm(formData)).toBe('{"apSSID":"RobotMarket","setTime":"12:30"}');
    });

    it("validates AP password confirmation", () => {
        expect(validateApPasswordConfirmation("secret123", "secret123")).toBe("");
        expect(validateApPasswordConfirmation("secret123", "different")).toBe(SETTINGS_MESSAGES.passwordMismatch);
    });

    it("maps RSSI to WiFi signal levels", () => {
        expect(getWifiSignalLevel(-45)).toBe(4);
        expect(getWifiSignalLevel(-55)).toBe(3);
        expect(getWifiSignalLevel(-65)).toBe(2);
        expect(getWifiSignalLevel(-75)).toBe(1);
    });

    it("sorts WiFi networks by strongest signal first", () => {
        expect(sortWifiNetworksBySignal([
            {ssid: "weak", rssi: -80},
            {ssid: "strong", rssi: -40},
            {ssid: "medium", rssi: -60},
        ]).map((network) => network.ssid)).toEqual(["strong", "medium", "weak"]);
    });
});
