/**
 * Converts the dashboard API response into the stable shape used by the UI.
 */
export function mapDashboardData(apiData = {}, {formatApiDateTime}) {
    const today = apiData?.today || {};
    const speaker = apiData?.speaker || {};
    const lastSale = apiData?.last_sale || {};
    const mostSold = apiData?.most_sold || {};
    const wifi = apiData?.device?.wifi || {};
    const device = apiData?.device?.info || {};

    const latestActivity = Array.isArray(apiData?.latest_activity)
        ? apiData.latest_activity
        : [];
    const warnings = Array.isArray(apiData?.warnings)
        ? apiData.warnings
        : [];
    const notifications = Array.isArray(apiData?.notifications)
        ? apiData.notifications
        : [];

    return {
        today_sales: today.sales ?? 0,
        today_transactions: today.transactions ?? 0,
        active_products: today.active_products ?? 0,
        device_status: device.status,
        device_model: device?.model,
        device_uptime: device?.uptime ?? 0,

        wifi: {
            rssi: wifi.rssi ?? "",
            ssid: wifi.ssid ?? "",
            connected: wifi.connected ?? "",
        },

        board_version: "--",

        last_operation: {
            title: latestActivity[0]?.title ?? "--",
            time: formatApiDateTime(latestActivity[0]?.time),
            status: latestActivity[0]?.status ?? "--",
        },

        speaker: {
            volume: speaker.volume ?? 75,
            muted: speaker.muted ?? false,
        },

        last_sale: {
            product: lastSale.product ?? "--",
            price: lastSale.price ?? 0,
            channel: lastSale.channel ?? "--",
            customer: lastSale.customer ?? "--",
            payment_method: lastSale.payment_method ?? "--",
            time: formatApiDateTime(lastSale.time),
        },

        most_sold: {
            today: {
                name: mostSold.today?.name ?? "--",
                count: mostSold.today?.count ?? 0,
            },
            week: {
                name: mostSold.week?.name ?? "--",
                count: mostSold.week?.count ?? 0,
            },
            month: {
                name: mostSold.month?.name ?? "--",
                count: mostSold.month?.count ?? 0,
            },
        },

        warnings: warnings.map((item) => ({
            title: item.title ?? "--",
            message: item.message ?? "--",
            status: item.status ?? "--",
            time: formatApiDateTime(item.time),
        })),

        notifications: notifications.map((item) => ({
            title: item.title ?? "--",
            message: item.message ?? "--",
            status: item.status ?? "--",
            time: formatApiDateTime(item.time),
        })),

        latest_activity: latestActivity.map((item) => ({
            title: item.title ?? "--",
            description: item.description ?? "--",
            status: item.status ?? "--",
            time: formatApiDateTime(item.time),
        })),

        sales_chart: apiData?.sales_chart || {},
    };
}
