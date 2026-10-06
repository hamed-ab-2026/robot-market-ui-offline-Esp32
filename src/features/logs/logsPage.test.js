import {describe, expect, it} from "vitest";
import {renderLogsPageShell} from "./logsPage.js";

describe("logs page shell", () => {
    it("renders log status, area, and back action", () => {
        const html = renderLogsPageShell({logsIcon: "<span>logs</span>"});

        expect(html).toContain("logConnectionStatus");
        expect(html).toContain("logArea");
        expect(html).toContain("data-page-back");
    });
});
