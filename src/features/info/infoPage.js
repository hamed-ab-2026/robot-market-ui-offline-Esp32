import {infoItem} from "../../components/ui/infoItem.js";

/**
 * Renders the device information page.
 */
export function renderInfoPageShell({data, reportsIcon}) {
    const wifi = data.wifi || {};
    const lastOp = data.last_operation || {};

    return `
                          <div class="card">
                          <div style="display: flex;justify-content: start;align-items: center; gap: 10px">
                              ${reportsIcon}
                              <h2> اطلاعات دستگاه</h2>
                          </div>

                              <div class="drawer">
                                  <div class="drawer-summary" data-drawer-target="general-info">اطلاعات کلی دستگاه</div>
                                  <div class="drawer-content" id="general-info">
                                      <div class="section">
                                          ${infoItem("شماره سریال دستگاه", data.SN)}
                                          ${infoItem("نسخه نرم‌افزار ESP", data.esp_version)}
                                          ${infoItem("نسخه نرم‌افزار STM", data.stm_version)}
                                          ${infoItem("نسخه برد", data.board_version)}
                                          ${infoItem("نوع چیپ ESP", data.esp_chip)}
                                          ${infoItem("نوع چیپ STM", data.stm_chip)}
                                      </div>
                                  </div>
                              </div>

                              <div class="drawer">
                                  <div class="drawer-summary" data-drawer-target="memory-info">اطلاعات حافظه دستگاه</div>
                                  <div style="display: none" class="drawer-content" id="memory-info">
                                      <div class="section">
                                          ${infoItem("حافظه هیپ استفاده شده", data.heap_used)}
                                          ${infoItem("حافظه هیپ کل", data.heap_total)}
                                          ${infoItem("حافظه فلش استفاده شده", data.flash_used)}
                                          ${infoItem("حافظه فلش کل", data.flash_total)}
                                      </div>
                                  </div>
                              </div>

                              <div class="drawer">
                                  <div class="drawer-summary" data-drawer-target="wifi-sta-info">وضعیت اتصال دستگاه به وای‌فای</div>
                                  <div style="display: none" class="drawer-content" id="wifi-sta-info">
                                      <div class="section">
                                          ${infoItem("نام شبکه وای‌فای متصل شده", wifi.wifi_sta_ssid)}
                                          ${infoItem("آدرس شبکه دستگاه", wifi.wifi_sta_ip)}
                                          ${infoItem("وضعیت اتصال به وای‌فای", wifi.wifi_sta_connected)}
                                          ${infoItem("شناسه سخت‌افزاری دستگاه (MAC)", wifi.mac)}
                                          ${infoItem("قدرت سیگنال (RSSI)", wifi.rssi)}
                                          ${infoItem("وضعیت سیستم", wifi.system_status)}
                                      </div>
                                  </div>
                              </div>

                              <div class="drawer">
                                  <div class="drawer-summary" data-drawer-target="wifi-ap-info">اطلاعات نقطه دسترسی دستگاه</div>
                                  <div style="display: none" class="drawer-content" id="wifi-ap-info">
                                      <div class="section">
                                          ${infoItem("نام شبکه‌ای که دستگاه ایجاد کرده", wifi.wifi_ap_ssid)}
                                          ${infoItem("آدرس شبکه این نقطه دسترسی", wifi.wifi_ap_ip)}
                                          ${infoItem("تعداد دستگاه‌های متصل به این شبکه", wifi.wifi_ap_connected_devices)}
                                      </div>
                                  </div>
                              </div>

                              <div class="drawer">
                                  <div class="drawer-summary" data-drawer-target="last-operation-info">آخرین عملیات دستگاه</div>
                                  <div style="display: none" class="drawer-content" id="last-operation-info">
                                      <div class="section">
                                          ${infoItem("عنوان عملیات", lastOp.title)}
                                          ${infoItem("زمان عملیات", lastOp.time)}
                                          ${infoItem("وضعیت عملیات", lastOp.status)}
                                      </div>
                                  </div>
                              </div>
                          </div>

                         <div class="page-action-bar">
                              <button class="btn btn-outline" data-page-back>بازگشت</button>
                          </div>
              `;
}
