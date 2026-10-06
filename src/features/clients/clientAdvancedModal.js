import {isClientActive} from "./clientRules.js";

/**
 * Renders the client edit modal body. Save behavior stays in app.js while the
 * feature owns its large form markup.
 */
export function renderClientAdvancedModalBody({key, rowData, userIcon}) {
    const rowName = rowData.name || "";
    const rowId = rowData.id || "";
    const rowVisible = isClientActive(rowData.status);
    const rowError = rowData.error || "";
    const rowDisabledByServer = rowData.disabledByServer || "";

    return `
                  <div class="adv-modal">
                      <div class="modal-product-icon">
                      ${userIcon}
                      </div>

                      <p style="text-align: center; margin-bottom: 10px;">
                         ویرایش کاربر ${rowName || rowId}
                      </p>

                      <div class="input-group">
                          <label>ویرایش نام</label>
                          <input type="text" id="modalName" placeholder="نام کاربر" value="${rowName}" class="input-text">
                      </div>

                      <div class="input-group">
                            <label>ویرایش ایدی</label>
                            <input
                                type="text"
                                id="modalId"
                                placeholder="ایدی کاربر"
                                value="${rowId}"
                                class="input-text"
                                style="direction: ltr"
                                min="0"
                                data-digits-only
                            >
                        </div>

                      <div  class="input-group">
                          <div class="toggle-row">
                              <span>وضعیت کاربر</span>
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

                      <div class="input-group">
                          <button
                              type="button"
                              class="btn-danger"
                              data-permission="clients.delete"
                              data-client-delete="${key}"
                              style="width: 100%"
                              ${rowDisabledByServer ? "disabled" : ""}
                          >
                              حذف کاربر
                          </button>
                      </div>
                  </div>
              `;
}

/**
 * Renders the create-client modal body shared by the clients feature.
 */
export function renderClientCreateModalBody({userIcon}) {
    return `
                  <div class="adv-modal">
                      <div class="modal-product-icon">
                      ${userIcon}
                      </div>

                      <p style="text-align: center; margin-bottom: 10px;">
                         افزودن کاربر جدید
                      </p>

                      <div class="input-group">
                          <label>نام</label>
                          <input type="text" id="modalName" placeholder="نام کاربر" value="" class="input-text">
                      </div>

                      <div class="input-group">
                          <label>ایدی</label>
                          <input
                              type="text"
                              id="modalId"
                              placeholder="ایدی کاربر"
                              value=""
                              class="input-text"
                              data-digits-only
                          >
                      </div>

                      <div class="input-group">
                          <div class="toggle-row">
                              <span>وضعیت کاربر</span>
                              <label class="switch">
                                <input type="checkbox" id="modalVisible" checked>
                                <span class="slider"></span>
                              </label>
                          </div>
                      </div>
                  </div>
              `;
}

/**
 * Wires the delete action inside the client edit modal without inline handlers.
 */
export function bindClientAdvancedModalEvents(modal, {onDelete}) {
    modal?.querySelector("[data-client-delete]")?.addEventListener("click", (event) => {
        onDelete(event.currentTarget.dataset.clientDelete);
    });

    modal?.querySelectorAll("[data-digits-only]").forEach((input) => {
        input.addEventListener("input", () => {
            input.value = input.value.replace(/[^0-9]/g, "");
        });
    });
}
