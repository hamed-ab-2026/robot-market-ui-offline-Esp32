export const NOTIFICATION_STATUS_COLORS = Object.freeze({
    success: "var(--success-solid)",
    warning: "var(--warning)",
    error: "var(--danger-solid)",
    danger: "var(--danger-solid)",
    info: "var(--info)",
});

/**
 * Counts notifications that have not been explicitly marked as read.
 */
export function countUnreadNotifications(notifications) {
    return notifications.filter((notification) => notification?.read !== true).length;
}

/**
 * Normalizes any API response shape to the array used by the notifications page.
 */
export function getNotificationsFromPayload(payload) {
    return Array.isArray(payload?.notifications) ? payload.notifications : [];
}
