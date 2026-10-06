export const BALANCE_MESSAGES = Object.freeze({
    requiredGlobalBalance: "اول مقدار وارد کن!",
});

/**
 * Checks the bulk balance input before copying it to every row.
 */
export function validateGlobalBalance(value) {
    return String(value ?? "") === "" ? BALANCE_MESSAGES.requiredGlobalBalance : "";
}

/**
 * Creates the API payload for a single balance row.
 */
export function createBalanceUpdate(id, value) {
    return {
        id: String(id || "").trim(),
        newBalance: Number(value),
    };
}

/**
 * Confirms that the export endpoint returned a CSV Blob before triggering download.
 */
export function isCsvBlob(value) {
    return value instanceof Blob && value.type.toLowerCase().includes("text/csv");
}
