/**
 * Shows the shared confirmation modal used by admin-panel features.
 * The icon resolver is injected so this UI helper does not depend on app.js globals.
 */
export function showModal({
                              message = "",
                              type = "info",
                              onConfirm = null,
                              onCancel = null,
                              showConfirm = true,
                              extraHtml = "",
                              getIcon,
                          }) {
    const iconFor = typeof getIcon === "function" ? getIcon : () => "";
    const types = {
        info: {color: "var(--info)", icon: iconFor("info")},
        noType: {color: "", icon: ""},
        success: {color: "var(--success)", icon: iconFor("success")},
        warning: {color: "var(--warning)", icon: iconFor("warning")},
        danger: {color: "var(--danger)", icon: iconFor("danger")},
        reboot: {color: "var(--info)", icon: iconFor("refresh")},
    };

    const modalType = types[type] || types.info;
    const modal = document.createElement("div");
    modal.className = "app-modal";

    modal.innerHTML = `
              <div class="app-modal-box">

                  <div class="app-modal-header" style="color:${modalType.color}">
                      <span class="app-modal-icon">${modalType.icon}</span>
                  </div>

                  <div class="app-modal-message">
                      ${message}
                  </div>

                  ${extraHtml}

                  ${
        showConfirm
            ? `
                      <div class="app-modal-actions">
                          <button class="btn modal-confirm"> تایید</button>
                          <button class="btn btn-outline modal-cancel">لغو</button>
                      </div>
                      `
            : ""
    }

              </div>
              `;

    document.body.appendChild(modal);

    if (showConfirm) {
        const cancelBtn = modal.querySelector(".modal-cancel");
        const confirmBtn = modal.querySelector(".modal-confirm");

        cancelBtn.onclick = () => {
            modal.remove();
            onCancel?.();
        };

        confirmBtn.onclick = () => {
            onConfirm?.(modal);
        };
    }

    return modal;
}
