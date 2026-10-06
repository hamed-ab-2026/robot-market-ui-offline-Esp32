import {describe, expect, it} from "vitest";
import {renderClientAdvancedModalBody, renderClientCreateModalBody} from "./clientAdvancedModal.js";

describe("client advanced modal", () => {
    it("renders client values and delete action", () => {
        const html = renderClientAdvancedModalBody({
            key: "client_1",
            rowData: {
                name: "Sara",
                id: "123",
                status: "Inactive",
                disabledByServer: true,
            },
            userIcon: "<span>user</span>",
        });

        expect(html).toContain("Sara");
        expect(html).toContain("123");
        expect(html).toContain('data-client-delete="client_1"');
        expect(html).toContain("data-digits-only");
        expect(html).not.toContain("oninput=");
        expect(html).toContain("disabled");
    });

    it("renders create-client fields without inline handlers", () => {
        const html = renderClientCreateModalBody({
            userIcon: "<span>user</span>",
        });

        expect(html).toContain("افزودن کاربر جدید");
        expect(html).toContain('id="modalName"');
        expect(html).toContain('id="modalId"');
        expect(html).toContain("data-digits-only");
        expect(html).not.toContain("onclick=");
        expect(html).not.toContain("oninput=");
    });
});
