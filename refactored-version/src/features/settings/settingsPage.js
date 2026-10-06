function renderPosOption(value, label, selectedValue) {
    return `<option value="${value}" ${selectedValue === value ? "selected" : ""}>${label}</option>`;
}

/**
 * Builds the settings page markup while keeping save/navigation behavior in app.js.
 */
export function renderSettingsPageShell({data, defaults, icons}) {
    return `
                      <div class="card" style="padding-bottom: 60px">
                          <div>
                              <div style="display: flex; align-items: center; justify-content: start; gap: 10px;">
                                  ${icons.setting}
                                  <h2>تنظیمات دستگاه</h2>
                              </div>
                          </div>

                          <form id="settingsForm">

                              <!-- WiFi Settings -->
                              <div class="drawer">
                                  <div class="drawer-summary" data-settings-drawer="wifi">
                                    <div style="display: flex; align-items: center; justify-content: start; gap: 10px;">
                                          ${icons.wireless}
                                          <div>تنظیمات شبکه</div>
                                      </div>
                                  </div>

                                  <div class="drawer-content" id="wifi" style="display:none">

                                      <div class="grid">

                                          <!-- hidden input برای submit فرم -->
                                          <input type="hidden" name="wifiSSID" id="wifiSSID">

                                          <div class="compact-card wifi-section">

                                              <div class="section-title">
                                                  <span>انتخاب شبکه WiFi</span>
                                                  <div style="display: flex; gap: 10px">
                                                      <button type="button" class="btn btn-outline" data-wifi-add data-permission="wifi.connect" style="width: 40px">
                                                          ${icons.add}
                                                      </button>
                                                       <button type="button" class="btn btn-outline" data-wifi-scan data-permission="wifi.scan" style="width: 40px">
                                                          ${icons.refresh}
                                                      </button>
                                                  </div>
                                              </div>

                                              <div id="wifiList" class="wifi-list">
                                                  در حال اسکن...
                                              </div>

                                          </div>


                                              <div class="compact-card">
                                                   <div class="form-group">
                                                     <label>نقطه اتصال دستگاه (AP)</label>
                                                     <input  type="text" name="apSSID" value="${data.apSSID || ""}" placeholder="نام نقطه اتصال دستگاه را وارد کنید">
                                                   </div>

                                                   <div class="form-group">
                                                      <label>رمز عبور جدید (حداقل ۸ کاراکتر)</label>

                                                        <div style="display:flex;gap:6px">

                                                              <button
                                                                  type="button"
                                                                  class="btn btn-outline"
                                                                  style="width: 44px"
                                                                data-toggle-input="APwifiPassword"
                                                              >
                                                                  ${icons.eye}
                                                              </button>

                                                              <input
                                                                   dir="ltr"
                                                                   type="password"
                                                                   id="APwifiPassword"
                                                                   name="apPassword"
                                                                   placeholder="رمز عبور جدید را وارد کنید"
                                                                   style="flex:1"
                                                              >

                                                          </div>

                                                   </div>

                                                     <div class="form-group">
                                                      <label>تایید رمز عبور جدید (حداقل ۸ کاراکتر)</label>

                                                          <div style="display:flex;gap:6px">

                                                              <button
                                                                  type="button"
                                                                  class="btn btn-outline"
                                                                  style="width: 44px"
                                                                data-toggle-input="APConfwifiPassword"
                                                              >
                                                                  ${icons.eye}
                                                              </button>

                                                              <input
                                                                   dir="ltr"
                                                                   type="password"
                                                                   name="confPassword"
                                                                   placeholder="تکرار رمز عبور جدید را وارد کنید"
                                                                   id="APConfwifiPassword"
                                                                   style="flex:1"
                                                              >

                                                          </div>

                                                   </div>
                                              </div>


                                      </div>

                                  </div>

                              </div>
                              <!-- POS Device -->
                              <div class="drawer">
                                  <div class="drawer-summary" data-settings-drawer="pos">
                                       <div style="display: flex; align-items: center; justify-content: start; gap: 10px;">
                                          ${icons.pay}
                                          <div>تنظیمات کارتخوان (POS)</div>
                                      </div>
                                  </div>
                                  <div class="drawer-content" id="pos" style="display:none">
                                      <div class="form-group">
                                          <label>انتخاب پروتکل کارتخوان</label>
                                          <select name="posDevice">
                                              ${renderPosOption("SAMAN", "سامان کیش", data.posDevice)}
                                              ${renderPosOption("IRAN", "ایران کیش", data.posDevice)}
                                              ${renderPosOption("FAN", "فن آوا", data.posDevice)}
                                              ${renderPosOption("SADAD", "سداد", data.posDevice)}
                                          </select>
                                      </div>
                                  </div>
                              </div>

                              <!-- Date & Time -->
                              <div class="drawer">
                                  <div class="drawer-summary" data-settings-drawer="datetime">
                                      <div style="display: flex; align-items: center; justify-content: start; gap: 10px;">
                                          ${icons.setting}
                                          <div>تنظیم زمان و تاریخ</div>
                                      </div>
                                  </div>
                                  <div class="drawer-content" id="datetime" style="display:none">
                                      <div class="grid">
                                          <div class="form-group">
                                              <label>تاریخ</label>
                                                <input type="date" name="setDate" value="${data.currentDate || defaults.date}">
                                          </div>
                                          <div class="form-group">
                                              <label>ساعت</label>
                                              <input type="time" name="setTime" value="${data.currentTime || defaults.time}">
                                          </div>
                                      </div>
                                  </div>
                              </div>

                                          <!-- رخدادها -->
                              <div class="drawer" data-permission="logs.view" data-settings-nav="#/logs">
                                  <div class="drawer-summary">
                                      <div style="display: flex; align-items: center; justify-content: start; gap: 10px; cursor: pointer;">
                                          ${icons.logs}
                                          <div>رخدادها</div>
                                      </div>
                                  </div>
                              </div>

                              <!-- تنظیمات کارخانه -->
                              <div class="drawer" data-permission="factory.view" data-settings-nav="#/factory">
                                  <div class="drawer-summary">
                                      <div style="display: flex; align-items: center; justify-content: start; gap: 10px; cursor: pointer; color: var(--danger);">
                                          ${icons.refresh}
                                          <div>تنظیمات کارخانه</div>
                                      </div>
                                  </div>
                              </div>


                          </form>
                      </div>

                        <div class="page-action-bar">
                              <button type="submit" form="settingsForm" class="btn" data-permission="settings.update">ذخیره تمامی تغییرات</button>
                              <button type="button" class="btn btn-outline" data-settings-nav="#/">بازگشت</button>
                        </div>

                  `;
}

/**
 * Wires settings page controls after rendering so the large settings template
 * does not need inline JavaScript handlers.
 */
export function bindSettingsPageEvents(root, {
    onSubmit,
    onToggleDrawer,
    onToggleInput,
    onNavigate,
    onAddWifi,
    onScanWifi,
}) {
    root.querySelector("#settingsForm")?.addEventListener("submit", onSubmit);

    root.querySelectorAll("[data-settings-drawer]").forEach((element) => {
        element.addEventListener("click", () => onToggleDrawer(element.dataset.settingsDrawer));
    });

    root.querySelectorAll("[data-toggle-input]").forEach((button) => {
        button.addEventListener("click", () => onToggleInput(button.dataset.toggleInput));
    });

    root.querySelectorAll("[data-settings-nav]").forEach((element) => {
        element.addEventListener("click", () => onNavigate(element.dataset.settingsNav));
    });

    root.querySelector("[data-wifi-add]")?.addEventListener("click", onAddWifi);
    root.querySelector("[data-wifi-scan]")?.addEventListener("click", onScanWifi);
}

/**
 * Wires scanned WiFi network items after each scan result render.
 */
export function bindWifiListEvents(root, {onSelectWifi}) {
    root.querySelectorAll("[data-wifi-ssid]").forEach((item) => {
        item.addEventListener("click", () => onSelectWifi(item.dataset.wifiSsid));
    });
}
