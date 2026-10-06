import {describe, expect, it} from "vitest";
import {renderClientTableRowHtml} from "./clientTable.js";

describe("client table renderer", () => {
    it("renders inactive error rows with the warning action", () => {
        const html = renderClientTableRowHtml({
            key: "client_1",
            index: 2,
            row: {name: "Ali", id: "42"},
            icons: {
                warning: "<span>warning</span>",
                setting: "<span>setting</span>",
            },
            state: {
                isDisabled: true,
                hasError: true,
                isActive: false,
            },
        });

        expect(html).toContain("Ali");
        expect(html).toContain("غیر فعال");
        expect(html).toContain("warning");
        expect(html).toContain("disabled");
        expect(html).toContain('data-client-settings="client_1"');
    });
});
