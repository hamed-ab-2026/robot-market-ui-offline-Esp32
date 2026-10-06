export const PERMISSIONS = Object.freeze({
    DASHBOARD_VIEW: "dashboard.view",
    DASHBOARD_REPORT_EXPORT: "dashboard.report.export",
    DEVICE_VOLUME_UPDATE: "device.volume.update",
    NOTIFICATIONS_VIEW: "notifications.view",
    NOTIFICATIONS_MARK_READ: "notifications.mark_read",
    PRICES_VIEW: "prices.view",
    PRICES_UPDATE: "prices.update",
    PRICES_RESOLVE_ERROR: "prices.resolve_error",
    CLIENTS_VIEW: "clients.view",
    CLIENTS_CREATE: "clients.create",
    CLIENTS_UPDATE: "clients.update",
    CLIENTS_DELETE: "clients.delete",
    BALANCE_VIEW: "balance.view",
    BALANCE_UPDATE: "balance.update",
    BALANCE_EXPORT: "balance.export",
    SETTINGS_VIEW: "settings.view",
    SETTINGS_UPDATE: "settings.update",
    WIFI_SCAN: "wifi.scan",
    WIFI_CONNECT: "wifi.connect",
    DEVICE_INFO_VIEW: "device_info.view",
    SERVICE_CONFIG_VIEW: "service_config.view",
    SERVICE_CONFIG_UPDATE: "service_config.update",
    FACTORY_VIEW: "factory.view",
    FACTORY_UPDATE: "factory.update",
    FACTORY_RESET: "factory.reset",
    LOGS_VIEW: "logs.view",
    SYSTEM_REBOOT: "system.reboot",
});

export const ALL_PERMISSIONS = Object.freeze(Object.values(PERMISSIONS));

export const ROUTE_PERMISSIONS = Object.freeze({
    "#/": PERMISSIONS.DASHBOARD_VIEW,
    "#/notifications": PERMISSIONS.NOTIFICATIONS_VIEW,
    "#/prices": PERMISSIONS.PRICES_VIEW,
    "#/clients": PERMISSIONS.CLIENTS_VIEW,
    "#/balance": PERMISSIONS.BALANCE_VIEW,
    "#/settings": PERMISSIONS.SETTINGS_VIEW,
    "#/factory": PERMISSIONS.FACTORY_VIEW,
    "#/logs": PERMISSIONS.LOGS_VIEW,
    "#/info": PERMISSIONS.DEVICE_INFO_VIEW,
    "#/service-configuration": PERMISSIONS.SERVICE_CONFIG_VIEW,
});

/**
 * Keeps permission checks predictable: development mode is fully open, while
 * production requires the exact permission string returned by the backend.
 */
export function canAccessPermission({developMode, user, permission}) {
    if (developMode) return true;
    return user?.permissions?.includes(permission) === true;
}
