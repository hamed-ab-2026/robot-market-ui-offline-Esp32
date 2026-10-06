/**
 * Wires common drawer and back-button actions used by read-only admin pages.
 */
export function bindDrawerPageEvents(root, {onToggleDrawer, onBack}) {
    root.querySelectorAll("[data-drawer-target]").forEach((element) => {
        element.addEventListener("click", () => onToggleDrawer(element.dataset.drawerTarget));
    });

    root.querySelectorAll("[data-page-back]").forEach((button) => {
        button.addEventListener("click", onBack);
    });
}
