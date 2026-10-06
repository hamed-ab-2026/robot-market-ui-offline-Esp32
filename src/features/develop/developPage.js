/**
 * Wires the development icon grid after rendering.
 */
export function bindDevelopPageEvents(root, {onCopyIcon, onBack}) {
    root.querySelectorAll("[data-dev-icon]").forEach((card) => {
        card.addEventListener("click", () => onCopyIcon(card.dataset.devIcon));
    });

    root.querySelector("[data-develop-back]")?.addEventListener("click", onBack);
}
