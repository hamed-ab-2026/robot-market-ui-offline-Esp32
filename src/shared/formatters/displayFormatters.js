/**
 * Formats numbers using Persian digits. Invalid or empty values intentionally
 * become zero because dashboard counters should never render NaN.
 */
export function formatNumber(value) {
    return new Intl.NumberFormat("fa-IR").format(Number(value) || 0);
}

/**
 * Normalizes empty API values to the shared placeholder used across the panel.
 */
export function safeText(value) {
    if (value === undefined || value === null || value === "") return "--";
    return value;
}

/**
 * Converts API date values to a Persian calendar display string. Invalid date
 * strings are returned unchanged so operators can still see the raw backend value.
 */
export function formatApiDateTime(value, showTime = true) {
    if (!value) return "--";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };

    if (showTime) {
        options.hour = "2-digit";
        options.minute = "2-digit";
    }

    return new Intl.DateTimeFormat("fa-IR", options).format(date);
}
