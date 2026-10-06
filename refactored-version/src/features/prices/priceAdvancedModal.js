import {DEFAULT_BARCODE} from "./priceRules.js";

/**
 * Builds the advanced modal hint block and adds the resolve action when needed.
 */
export function buildAdvancedHint({key, channel, error, disabledByServer, visible, getAdvancedHintItems}) {
    const hints = getAdvancedHintItems({channel, error, disabledByServer, visible});

    if (error) {
        hints.push(`
                          <div class="advanced-hint-actions" style="margin-top:10px;">
                              <button
                                  class="btn btn-danger"
                                  data-permission="prices.resolve_error"
                                  data-resolve-channel-error="${key}"
                                  type="button"
                              >
                                  رفع ایراد
                              </button>
                          </div>
                      `);
    }

    return hints.join("");
}

/**
 * Renders the advanced product-channel modal body. The save behavior remains in
 * app.js, but the large static form markup lives with the prices feature.
 */
export function renderPriceAdvancedModalBody({rowData, modalHint, productIcon}) {
    const rowName = rowData.name || "";
    const rowPrice = rowData.price || 0;
    const rowQty = rowData.quantity || 0;
    const rowSize = String(rowData.size || "1");
    const rowBarcode = rowData.barcode || DEFAULT_BARCODE;
    const rowVisible = rowData.visible ?? true;
    const rowChannel = rowData.channel ?? "-";
    const rowError = rowData.error || "";

    return `
                      <div class="adv-modal">
                          <div class="modal-product-icon">
                          ${productIcon}
                          </div>

                          <p style="text-align: center; margin-bottom: 10px;">
                             پیکربندی کانال ${rowChannel}
                          </p>

                          <div class="input-group">
                              <label>تغییر نام</label>
                              <input type="text" id="modalName" placeholder="نام محصول" value="${rowName}" class="input-text">
                          </div>

                          <div class="input-group">
                              <label>بارکد کالا</label>
                              <input
                                  type="text"
                                  id="modalBarcode"
                                  value="${rowBarcode}"
                                  class="input-text"
                                  placeholder="بارکد محصول"
                                  inputmode="numeric"
                                  autocomplete="off"
                              >
                          </div>

                          <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                              <div class="input-group">
                                  <label>قیمت</label>
                                  <input type="number" id="modalPrice" value="${rowPrice}" class="input-number">
                              </div>

                             <div class="input-group">
                              <label>تعداد</label>

                              <div class="qty-control">
                                  <button type="button" class="qty-btn" data-qty-step="-1">−</button>

                                  <input
                                      type="number"
                                      id="modalQty"
                                      value="${rowQty}"
                                      class="input-number qty-input"
                                      min="0"
                                  >

                                  <button type="button" class="qty-btn" data-qty-step="1">+</button>
                              </div>
                          </div>

                          </div>

                          <div class="gift-section">
                              <label>کانال‌های هدیه (10,11 ...)</label>
                              <div class="gift-grid" style="display: flex; gap: 5px;">
                                  <input type="number" id="gift1" placeholder="1" class="input-number" value="${rowData.gifts?.[0] || ""}">
                                  <input type="number" id="gift2" placeholder="2" class="input-number" value="${rowData.gifts?.[1] || ""}">
                                  <input type="number" id="gift3" placeholder="3" class="input-number" value="${rowData.gifts?.[2] || ""}">
                              </div>
                          </div>

                          <div  class="input-group">
                              <div class="toggle-row">
                                  <span>غیر فعال سازی کانال</span>
                                  <label class="switch">
                                    <input
                                        type="checkbox"
                                        id="modalVisible"
                                        ${rowVisible ? "checked" : ""}
                                        ${rowError ? "disabled" : ""}
                                    >
                                    <span class="slider"></span>
                                  </label>
                              </div>
                          </div>

                        <div class="advanced-hint-box ${rowError ? "advanced-hint-error" : "hidden"}" id="advancedHintBox">
                            ${modalHint}
                        </div>

                          <div class="input-group">
                              <label>فضای اشغال شده (Slot Size)</label>
                              <select
                                  id="modalSize"
                                  class="input-select"
                                  data-physical-size-select
                                  data-prev-value="${rowSize}"
                              >
                                  <option value="1" ${rowSize === "1" ? "selected" : ""}>1 کانال (استاندارد)</option>
                                  <option value="2" ${rowSize === "2" ? "selected" : ""}>2 کانال (عریض)</option>
                                  <option value="3" ${rowSize === "3" ? "selected" : ""}>3 کانال (خیلی عریض)</option>
                                  <option value="4" ${rowSize === "4" ? "selected" : ""}>4 کانال (کامل)</option>
                              </select>
                          </div>
                      </div>
                  `;
}

/**
 * Wires advanced price modal controls without inline handlers.
 */
export function bindPriceAdvancedModalEvents(modal, {onChangeQty, onPhysicalSizeChange, onResolveError}) {
    modal?.querySelectorAll("[data-qty-step]").forEach((button) => {
        button.addEventListener("click", () => onChangeQty(Number(button.dataset.qtyStep)));
    });

    modal?.querySelector("[data-physical-size-select]")?.addEventListener("change", onPhysicalSizeChange);
    modal?.querySelector("[data-resolve-channel-error]")?.addEventListener("click", (event) => {
        onResolveError(event.currentTarget.dataset.resolveChannelError);
    });
}
