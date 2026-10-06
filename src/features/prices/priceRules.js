export const DEFAULT_BARCODE = "11123455556789";

/**
 * Marks positive stock counts up to three as low stock for operator attention.
 */
export function isLowStock(quantity) {
    const count = Number(quantity || 0);
    return count > 0 && count <= 3;
}

/**
 * Returns CSS row flags for a product channel without mixing UI decisions into render code.
 */
export function getPriceRowState(row = {}) {
    return {
        isDisabled: Boolean(row.disabledByServer),
        hasError: Boolean(row.error),
        isHiddenInStore: row.visible === false,
        isLowStock: isLowStock(row.quantity),
    };
}

/**
 * Normalizes the advanced product form into the payload expected by the price API.
 */
export function createAdvancedPricePayload(rowData, formValues) {
    return {
        id: rowData.id,
        channel: rowData.channel ?? "-",
        name: String(formValues.name || "").trim(),
        barcode: String(formValues.barcode || "").trim(),
        price: Number(formValues.price || 0),
        quantity: Number(formValues.quantity || 0),
        size: Number(formValues.size || 1),
        visible: Boolean(formValues.visible),
        gifts: (formValues.gifts || []).map((gift) => String(gift || "").trim()),
    };
}

/**
 * Applies a quantity step while keeping product stock counts at zero or above.
 */
export function applyQuantityStep(currentValue, step) {
    return Math.max(0, Number(currentValue || 0) + Number(step || 0));
}

/**
 * Builds the operator-facing hints for a channel's physical and sales status.
 */
export function getAdvancedHintItems({channel, error, disabledByServer, visible}) {
    const hints = [`<div><strong>کانال:</strong> ${channel}</div>`];

    if (!visible) {
        hints.push("<div>این کالا در حال حاضر در فروشگاه نمایش داده نمی‌شود.</div>");
    }

    if (disabledByServer) {
        hints.push("<div>این کانال به دلیل وضعیت فیزیکی یا تداخل با کانال دیگر غیرفعال شده است.</div>");
    }

    if (error) {
        hints.push(`
                          <div class="advanced-hint-error-text">
                              <strong>خطا:</strong> ${error}
                          </div>
                      `);
    } else {
        hints.push("<div>وضعیت کانال در حال حاضر بدون خطا ثبت شده است.</div>");
    }

    return hints;
}
