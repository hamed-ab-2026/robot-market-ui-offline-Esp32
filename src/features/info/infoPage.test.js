import {describe, expect, it} from "vitest";
import {renderInfoPageShell} from "./infoPage.js";

describe("info page shell", () => {
    it("renders device information drawers", () => {
        const html = renderInfoPageShell({
            reportsIcon: "<span>reports</span>",
            data: {SN: "SN-1", wifi: {}, last_operation: {}},
        });

        expect(html).toContain("SN-1");
        expect(html).toContain('data-drawer-target="general-info"');
        expect(html).toContain("data-page-back");
    });
});
