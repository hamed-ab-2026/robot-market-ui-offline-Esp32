import {infoItem} from "../../components/ui/infoItem.js";

/**
 * Renders the service configuration page.
 */
export function renderServiceConfigurationPageShell({data, settingIcon}) {
    return `
                              <div class="card" style="padding-bottom: 80px">

                                  <div style="display:flex;align-items:center;gap:10px">
                                      ${settingIcon}
                                      <h2>تنظیمات سرویس دستگاه</h2>
                                  </div>

                      <div class="drawer">
                      <div class="drawer-summary" data-drawer-target="payment-config">
                      تنظیمات سیستم پرداخت
                      </div>

                      <div class="drawer-content" id="payment-config">

                      <div class="section">
                      ${infoItem("دستگاه سکه‌گیر", data.payment.coin_acceptor)}
                      ${infoItem("اسکناس‌گیر", data.payment.bill_acceptor)}
                      ${infoItem("پایانه کارتخوان", data.payment.pos_terminal)}
                      ${infoItem("پرداخت کیف پول", data.payment.wallet_payment)}
                      </div>

                      </div>
                      </div>

                      <div class="drawer">
                      <div class="drawer-summary" data-drawer-target="auxiliary-config">
                      سیستم‌های جانبی دستگاه
                      </div>

                      <div style="display:none" class="drawer-content" id="auxiliary-config">

                      <div class="section">
                      ${infoItem("فن خنک‌کننده", data.auxiliary.cooling_fan)}
                      ${infoItem("سیستم روشنایی", data.auxiliary.lighting_system)}
                      ${infoItem("سنسور دما", data.auxiliary.temperature_sensor)}
                      ${infoItem("سنسور درب دستگاه", data.auxiliary.door_sensor)}
                      </div>

                      </div>
                      </div>

                      <div class="drawer">
                      <div class="drawer-summary" data-drawer-target="elevator-config">
                      وضعیت آسانسور دستگاه
                      </div>

                      <div style="display:none" class="drawer-content" id="elevator-config">

                      <div class="section">
                      ${infoItem("فعال بودن آسانسور", data.elevator.elevator_enabled)}
                      ${infoItem("وضعیت موتور آسانسور", data.elevator.elevator_motor_status)}
                      ${infoItem("موقعیت فعلی آسانسور", data.elevator.elevator_position)}
                      ${infoItem("سنسور موقعیت آسانسور", data.elevator.elevator_sensor)}
                      </div>

                      </div>
                      </div>

                      </div>

                      <div class="page-action-bar">
                      <button class="btn btn-outline" data-page-back>
                      بازگشت
                      </button>
                      </div>
                      `;
}
