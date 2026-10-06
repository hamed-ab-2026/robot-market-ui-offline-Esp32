import {getPriceRowState} from "./priceRules.js";

/**
 * Renders one product-channel table row. It keeps the existing inline handlers
 * while moving row markup out of app.js.
 */
export function renderPriceTableRow({key, row, icons}) {
    const {isDisabled, hasError, isHiddenInStore, isLowStock} = getPriceRowState(row);
    const tr = document.createElement("tr");

    if (isDisabled) tr.classList.add("row-disabled");
    if (hasError || isHiddenInStore) tr.classList.add("row-error");

    tr.innerHTML = renderPriceTableRowHtml({key, row, icons, state: {isDisabled, hasError, isLowStock}});

    return tr;
}

/**
 * Builds the row HTML separately from DOM creation so the markup can be tested
 * without a browser-like test environment.
 */
export function renderPriceTableRowHtml({key, row, icons, state}) {
    const {isDisabled, hasError, isLowStock} = state;

    return `
                <td class="col-index">
                    <span class="channel-badge ${hasError ? "channel-badge-error" : ""}">
                        ${row.channel ?? "-"}
                    </span>
                </td>
                <td class="col-name">
                    <input data-price-field data-permission="prices.update" data-permission-mode="disable" class="input-text" type="text" value="${row.name || "---"}" data-key="${key}" data-field="name" ${isDisabled ? "disabled" : ""}>
                </td>
                <td class="col-qty">
                    <input
                        data-price-field
                        data-permission="prices.update"
                        data-permission-mode="disable"
                        class="input-number ${isLowStock ? "stock-warning" : ""}"
                        type="number"
                        value="${row.quantity || 0}"
                        data-key="${key}"
                        data-field="quantity"
                        ${isDisabled ? "disabled" : ""}
                        style="${isLowStock ? "border: 1px solid #ffbf00; background-color: #fff2f0;" : ""}"
                    >
                </td>

                <td class="col-price">
                    <input class="input-number" data-price-field data-permission="prices.update" data-permission-mode="disable" type="number" value="${row.price || 0}" data-key="${key}" data-field="price" step="1000" min="0" ${isDisabled ? "disabled" : ""}>
                </td>

                <td class="col-settings">
                    <button class="btn-manage" data-price-settings="${key}" data-permission="prices.update" data-permission-mode="disable" ${isDisabled ? "disabled" : ""}>
                        ${hasError ? icons.warning : icons.setting}
                    </button>
                </td>
            `;
}

/**
 * Appends all product-channel rows to the target table body.
 */
export function renderPriceTableRows(table, pricesData, icons) {
    Object.entries(pricesData || {}).forEach(([key, row]) => {
        table.appendChild(renderPriceTableRow({key, row, icons}));
    });
}

/**
 * Wires price-table interactions after rendering. This replaces inline event
 * attributes for the table while preserving the existing app-level handlers.
 */
export function bindPriceTableEvents(table, {onFieldBlur, onOpenSettings}) {
    table?.querySelectorAll("[data-price-field]").forEach((input) => {
        input.addEventListener("blur", () => onFieldBlur(input));
    });

    table?.querySelectorAll("[data-price-settings]").forEach((button) => {
        button.addEventListener("click", () => onOpenSettings(button.dataset.priceSettings));
    });
}
