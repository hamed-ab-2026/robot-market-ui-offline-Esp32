import {isClientActive} from "./clientRules.js";

/**
 * Builds a user row's HTML separately from DOM creation so the markup remains
 * easy to test without a browser-like test environment.
 */
export function renderClientTableRowHtml({key, row, index, icons, state}) {
    const {isDisabled, hasError, isActive} = state;

    return `
                              <td class="col-index">
                                  <span class="channel-badge ${hasError ? "channel-badge-error" : ""}">
                                      ${index}
                                  </span>
                              </td>

                              <td class="col-name">
                                  <input
                                      class="input-display"
                                      type="text"
                                      value="${row.name || "---"}"
                                      readonly
                                      tabindex="-1"
                                  >
                              </td>

                              <td class="col-id">
                                  <span>
                                      ${row.id || "--"}
                                  </span>
                              </td>

                              <td class="col-status">
                                  <span class="badge ${isActive ? "badge-active" : "badge-inactive"}">
                                      ${isActive ? "فعال" : "غیر فعال"}
                                  </span>
                              </td>

                              <td class="col-settings">
                                  <button
                                      class="btn-manage"
                                      data-client-settings="${key}"
                                      data-permission="clients.update"
                                      data-permission-mode="disable"
                                      ${isDisabled ? "disabled" : ""}
                                  >
                                      ${hasError ? icons.warning : icons.setting}
                                  </button>
                              </td>
                          `;
}

export function renderClientTableRow({key, row, index, icons}) {
    const state = {
        isDisabled: Boolean(row.disabledByServer),
        hasError: Boolean(row.error),
        isActive: isClientActive(row.status),
    };
    const tr = document.createElement("tr");

    if (!state.isActive) tr.classList.add("row-inactive");
    if (state.hasError) tr.classList.add("row-error");

    tr.innerHTML = renderClientTableRowHtml({key, row, index, icons, state});

    return tr;
}

export function renderClientTableRows(table, clientsData, icons) {
    Object.entries(clientsData || {}).forEach(([key, row], index) => {
        table?.appendChild(renderClientTableRow({key, row, index: index + 1, icons}));
    });
}

/**
 * Wires client-table actions after rendering so row markup does not need inline
 * JavaScript handlers.
 */
export function bindClientTableEvents(table, {onOpenSettings}) {
    table?.querySelectorAll("[data-client-settings]").forEach((button) => {
        button.addEventListener("click", () => onOpenSettings(button.dataset.clientSettings));
    });
}
