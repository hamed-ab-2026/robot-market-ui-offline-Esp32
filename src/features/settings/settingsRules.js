export const SETTINGS_MESSAGES = Object.freeze({
    passwordMismatch: "تکرار رمز عبور با رمز عبور جدید یکسان نیست.",
});

/**
 * Serializes form data in a stable format so settings navigation can detect unsaved changes.
 */
export function serializeSettingsForm(formData) {
    return JSON.stringify(Object.fromEntries(formData.entries()));
}

/**
 * Checks that the AP password confirmation matches the new AP password.
 */
export function validateApPasswordConfirmation(password, confirmation) {
    return password === confirmation ? "" : SETTINGS_MESSAGES.passwordMismatch;
}

/**
 * Maps WiFi RSSI to the visual signal level used by the four-bar indicator.
 */
export function getWifiSignalLevel(rssi) {
    const value = Number(rssi);

    if (value > -50) return 4;
    if (value > -60) return 3;
    if (value > -70) return 2;
    return 1;
}

/**
 * Sorts scanned WiFi networks from strongest to weakest signal.
 */
export function sortWifiNetworksBySignal(networks) {
    return [...networks].sort((a, b) => Number(b.rssi || 0) - Number(a.rssi || 0));
}
