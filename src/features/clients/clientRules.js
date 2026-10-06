export const CLIENT_MESSAGES = Object.freeze({
    requiredNameAndId: "نام و شناسه کاربر نمی‌توانند خالی باشند.",
    requiredNameAndPersianId: "نام و ایدی نمی‌توانند خالی باشند ❌",
});

/**
 * Treats both backend English statuses and existing Persian mock labels as active.
 */
export function isClientActive(status) {
    return ["active", "فعال"].includes(String(status || "").trim().toLowerCase());
}

/**
 * Converts the UI toggle state to the status value expected by the clients API.
 */
export function getClientApiStatus(isActive) {
    return isActive ? "Active" : "Inactive";
}

/**
 * Validates the minimal client payload required by create/edit forms.
 */
export function validateClientForm({name, id}, message = CLIENT_MESSAGES.requiredNameAndId) {
    if (!String(name || "").trim() || !String(id || "").trim()) {
        return message;
    }

    return "";
}
