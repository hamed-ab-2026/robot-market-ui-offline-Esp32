/**
 * Wires client page actions after rendering.
 */
export function bindClientPageEvents(root, {onAddClient, onBack}) {
    root.querySelector("[data-client-add]")?.addEventListener("click", onAddClient);
    root.querySelector("[data-client-back]")?.addEventListener("click", onBack);
}
