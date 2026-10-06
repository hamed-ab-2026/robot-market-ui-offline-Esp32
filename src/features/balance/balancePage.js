/**
 * Renders the balance-management page shell and rows.
 */
export function renderBalancePageShell({clients, payIcon}) {
    const rows = clients.map((client, index) => `
                      <tr>
                          <td>${index + 1}</td>
                          <td>${client.name}</td>
                          <td id="clientId${index}">${client.id}</td>

                          <td>
                              <input
                                  style="direction: ltr"
                                  type="number"
                                  step="100000"
                                  id="balance${index}"
                                  value="${client.balance}"
                              >
                          </td>

                      </tr>
                      `).join("");

    return `
                              <div class="card">

                              <div style="display: flex; align-items: center; justify-content: start; gap: 10px">
                                    ${payIcon}
                                    <h2>مدیریت موجودی کاربران</h2>
                              </div>

                                <table id="balanceTable">
                                  <thead>
                                    <tr>
                                      <th class="col-index">#</th>
                                      <th class="col-name">نام</th>
                                      <th class="col-id">ID</th>
                                      <th class="col-price">موجودی</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    ${rows}
                                  </tbody>
                                </table>
                              </div>

                            <div class="page-action-bar">
                                  <div class="action-group">
                                      <input type="number" step="1000000" id="globalBalanceInput" data-permission="balance.update" data-permission-mode="disable" placeholder="موجودی برای همه">
                                      <button class="btn" data-balance-apply-all data-permission="balance.update">
                                          اعمال به همه
                                      </button>
                                  </div>

                                  <div class="action-group">
                                      <button class="btn" data-balance-save data-permission="balance.update">
                                          ذخیره تغییرات
                                      </button>
                                      <button class="btn btn-outline" data-balance-export data-permission="balance.export">
                                          دانلود CSV
                                      </button>
                                  </div>
                              </div>
                  `;
}

/**
 * Wires balance page actions after rendering.
 */
export function bindBalancePageEvents(root, {onApplyAll, onSave, onExport}) {
    root.querySelector("[data-balance-apply-all]")?.addEventListener("click", onApplyAll);
    root.querySelector("[data-balance-save]")?.addEventListener("click", onSave);
    root.querySelector("[data-balance-export]")?.addEventListener("click", onExport);
}
