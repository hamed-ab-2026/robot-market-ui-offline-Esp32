/**
 * Renders the factory settings page shell.
 */
export function renderFactoryPageShell(config) {
    return `
                      <div class="card">
                      <h2>تنظیمات کارخانه (Factory)</h2>
                      <form id="factoryForm">

                          <!-- NETWORK -->
                      <div class="drawer">
                      <div class="drawer-summary" data-factory-drawer="network">شبکه و DNS</div>
                      <div class="drawer-content" style="display: none" id="network">
                      <div class="section">
                      <label>DNS Server 1</label>
                      <input type="text" name="dns1" value="${config.dns1 || "8.8.8.8"}">

                      <label>DNS Server 2</label>
                      <input type="text" name="dns2" value="${config.dns2 || "8.8.4.4"}">

                      <div class="switch-row" style="margin-top:15px;">
                      <span>تنظیمات IP دستی (Static)</span>
                      <label class="switch">
                      <input type="checkbox" id="manualIpToggle" name="use_static" data-factory-manual-ip ${config.use_static ? "checked" : ""}>
                      <span class="slider"></span>
                      </label>
                      </div>

                      <div id="manualIpFields" style="display: ${config.use_static ? "grid" : "none"}; gap:10px; margin-top:10px;">
                      <input type="text" name="static_ip" value="${config.static_ip || ""}" placeholder="IP">
                      <input type="text" name="static_gw" value="${config.static_gw || ""}" placeholder="Gateway">
                      <input type="text" name="static_sn" value="${config.static_sn || ""}" placeholder="Subnet Mask">
                      </div>
                      </div>
                      </div>
                      </div>

                          <!-- CORE -->
                      <div class="drawer">
                      <div class="drawer-summary" data-factory-drawer="core">هسته سیستم (Core)</div>
                      <div class="drawer-content" style="display: none" id="core" style="display:block;">
                      <div class="section">
                      <label>شماره سریال (Serial Number)</label>
                      <input type="text" name="serial" value="${config.serial || ""}">

                      <div class="auth-box" style="background:var(--primary-surface); padding:15px; border-radius:10px; text-align:center; margin:10px 0;">
                      <div id="authCode" style="font-size:24px; font-weight:bold; color:var(--primary); letter-spacing:5px;">----</div>
                      <button type="button" class="btn-small" data-factory-generate-code>تولید کد تایید</button>
                      </div>

                      <label>کد تایید نهایی</label>
                      <input type="number" name="sn_pass" id="input_sn_pass" placeholder="کد پشتیبان را وارد کنید">
                      </div>
                      </div>
                      </div>

                          <!-- MQTT -->
                      <div class="drawer">
                      <div class="drawer-summary" data-factory-drawer="mqtt">تنظیمات MQTT</div>
                      <div class="drawer-content" style="display: none" id="mqtt">
                      <div class="section">
                      <input type="text" name="mqtt_host" value="${config.mqtt_host || ""}" placeholder="Broker Host">
                      <input type="number" name="mqtt_port" value="${config.mqtt_port || 8883}" placeholder="Port">
                      <input type="text" name="mqtt_topic" value="${config.mqtt_topic || ""}" placeholder="Topic">

                      <div class="switch-row">
                      <span>Auto TLS Certificate</span>
                      <label class="switch">
                      <input type="checkbox" id="mqttAuto" name="mqtt_auto" data-factory-cert="mqtt" ${config.mqtt_auto ? "checked" : ""}>
                      <span class="slider"></span>
                      </label>
                      </div>
                      <textarea id="mqttCert" name="mqtt_cert" rows="4" style="display:${config.mqtt_auto ? "none" : "block"};">${config.mqtt_cert || ""}</textarea>
                      </div>
                      </div>
                      </div>

                          <!-- OTA -->
                      <div class="drawer">
                      <div class="drawer-summary" data-factory-drawer="ota">آپدیت آنلاین (OTA)</div>
                      <div class="drawer-content" style="display: none" id="ota">
                      <div class="section">
                      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                      <div>
                      <label>Primary Server</label>
                      <input type="text" name="ota_primary" value="${config.ota_primary || ""}" placeholder="سرور اصلی">
                      </div>
                      <div>
                      <label>Secondary Server</label>
                      <input type="text" name="ota_secondary" value="${config.ota_secondary || ""}" placeholder="سرور پشتیبان">
                      </div>
                      <div>
                      <label>Version File</label>
                      <input type="text" name="ota_version" value="${config.ota_version || ""}" placeholder="نسخه (مثلا version.json)">
                      </div>
                      <div>
                      <label>Firmware File</label>
                      <input type="text" name="ota_bin" value="${config.ota_bin || ""}" placeholder="فایل (مثلا firmware.bin)">
                      </div>
                      </div>

                      <div class="switch-row" style="margin-top:15px;">
                      <span>Auto TLS Certificate</span>
                      <label class="switch">
                      <input type="checkbox" id="otaAuto" name="ota_auto" data-factory-cert="ota" ${config.ota_auto ? "checked" : ""}>
                      <span class="slider"></span>
                      </label>
                      </div>

                      <textarea id="otaCert" name="ota_cert" rows="5"
                      style="display:${config.ota_auto ? "none" : "block"}; margin-top:10px;">${config.ota_cert || ""}</textarea>
                      </div>
                      </div>
                      </div>
                      </form>
                      </div>


                      <div class="page-action-bar" >
                      <button type="button" class="btn" data-factory-save data-permission="factory.update"> ذخیره تنظیمات</button>
                      <button type="button" class="btn btn-outline" data-factory-reset data-permission="factory.reset" style="border-color:var(--danger); color:var(--danger);">
                      ریست فکتوری
                      </button>
                      <button class="btn btn-outline" data-factory-back>بازگشت</button>
                      </div>
                      `;
}

/**
 * Creates the API payload from the factory form and related checkboxes.
 */
export function createFactoryPayload(form, {useStatic, mqttAuto}) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    data.use_static = useStatic;
    data.mqtt_auto = mqttAuto;

    return data;
}

/**
 * Shows or hides the static IP fields according to the manual IP checkbox.
 */
export function updateManualIpFields({isChecked, fields}) {
    if (fields) fields.style.display = isChecked ? "grid" : "none";
}

/**
 * Shows or hides a certificate textarea according to the auto certificate checkbox.
 */
export function updateCertificateField({isAuto, field}) {
    if (field) field.style.display = isAuto ? "none" : "block";
}

/**
 * Wires factory page controls after rendering.
 */
export function bindFactoryPageEvents(root, {
    onToggleDrawer,
    onToggleManualIp,
    onToggleCert,
    onGenerateCode,
    onSave,
    onReset,
    onBack,
}) {
    root.querySelectorAll("[data-factory-drawer]").forEach((element) => {
        element.addEventListener("click", () => onToggleDrawer(element.dataset.factoryDrawer));
    });

    root.querySelector("[data-factory-manual-ip]")?.addEventListener("change", onToggleManualIp);

    root.querySelectorAll("[data-factory-cert]").forEach((element) => {
        element.addEventListener("change", () => onToggleCert(element.dataset.factoryCert));
    });

    root.querySelector("[data-factory-generate-code]")?.addEventListener("click", onGenerateCode);
    root.querySelector("[data-factory-save]")?.addEventListener("click", onSave);
    root.querySelector("[data-factory-reset]")?.addEventListener("click", onReset);
    root.querySelector("[data-factory-back]")?.addEventListener("click", onBack);
}
