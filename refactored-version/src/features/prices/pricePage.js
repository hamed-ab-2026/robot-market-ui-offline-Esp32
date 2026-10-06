/**
 * Renders the static shell for the product-channel management page.
 */
export function renderPricePageShell({serverIcon, addActions = true}) {
    return `
                          <div class="card" style="padding-bottom: 80px">

                              <div style="display: flex; align-items: center; justify-content: start; gap: 10px">
                                  ${serverIcon}
                                  <h2>مدیریت هوشمند کالاها</h2>
                              </div>

                              <div class="table-responsive">
                                  <table>
                                      <thead>
                                          <tr>
                                              <th class="col-index">کانال</th>
                                              <th class="col-name">نام کالا</th>
                                              <th class="col-qty">تعداد</th>
                                              <th class="col-price">قیمت (تومان)</th>
                                              <th class="col-settings">عملیات</th>
                                          </tr>
                                      </thead>
                                      <tbody id="priceTable"></tbody>
                                  </table>
                              </div>

                          </div>

                          ${addActions ? `
                          <div class="page-action-bar">
                              <button class="btn" data-price-save data-permission="prices.update">ذخیره قیمت‌ها</button>
                              <button class="btn btn-outline" data-price-back>بازگشت</button>
                          </div>
                          ` : ""}
                          `;
}

/**
 * Wires product page actions after rendering.
 */
export function bindPricePageEvents(root, {onSave, onBack}) {
    root.querySelector("[data-price-save]")?.addEventListener("click", onSave);
    root.querySelector("[data-price-back]")?.addEventListener("click", onBack);
}
