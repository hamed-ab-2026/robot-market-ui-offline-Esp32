/**
 * Renders a simple label/value row used by read-only information panels.
 */
export function infoItem(label, value) {
    return `
                      <p>
                      <strong>${label}:</strong>
                      <span>${value ?? " - "}</span>
                      </p>
                      `;
}
