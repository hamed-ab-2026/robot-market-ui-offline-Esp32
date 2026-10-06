/**
 * Renders the extra HTML for connecting to a hidden WiFi network.
 */
export function renderHiddenWifiModalExtra({eyeIcon}) {
    return `
                                  <div class="form-group" style="margin-top:15px">

                                        <input
                                              dir="ltr"
                                              type="text"
                                              id="hiddenWifiSsidModal"
                                              placeholder="ssid"
                                              style="flex:1"
                                          >


                                      <div style="display:flex;gap:6px;margin-top: 8px">

                                          <button
                                              type="button"
                                              class="btn btn-outline"
                                              style="width: 44px"
                                              data-modal-toggle-input="hiddenWifiPasswordModal"
                                          >
                                              ${eyeIcon}
                                          </button>

                                          <input
                                              dir="ltr"
                                              type="password"
                                              id="hiddenWifiPasswordModal"
                                              placeholder="password"
                                              style="flex:1"
                                          >

                                      </div>

                                  </div>
                                  `;
}

/**
 * Renders the extra HTML for entering a visible WiFi network password.
 */
export function renderWifiPasswordModalExtra({eyeIcon}) {
    return `
                                  <div class="form-group" style="margin-top:15px">

                                      <div style="display:flex;gap:6px">

                                          <button
                                              type="button"
                                              class="btn btn-outline"
                                              style="width: 44px"
                                              data-modal-toggle-input="wifiPasswordModal"
                                          >
                                              ${eyeIcon}
                                          </button>

                                          <input
                                              dir="ltr"
                                              type="password"
                                              id="wifiPasswordModal"
                                              placeholder="رمز وای فای"
                                              style="flex:1"
                                          >

                                      </div>

                                  </div>
                                  `;
}

/**
 * Wires password visibility toggles inside WiFi modals.
 */
export function bindWifiModalEvents(modal, {onToggleInput}) {
    modal?.querySelectorAll("[data-modal-toggle-input]").forEach((button) => {
        button.addEventListener("click", () => onToggleInput(button.dataset.modalToggleInput));
    });
}
