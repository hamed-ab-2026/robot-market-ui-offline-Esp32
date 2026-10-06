import {describe, expect, it} from "vitest";
import {bindFactoryPageEvents, createFactoryPayload, renderFactoryPageShell} from "./factoryPage.js";

describe("factory page events", () => {
    it("exports the factory event binder", () => {
        expect(typeof bindFactoryPageEvents).toBe("function");
    });

    it("renders factory controls without inline handlers", () => {
        const html = renderFactoryPageShell({use_static: true, mqtt_auto: false, ota_auto: true});

        expect(html).toContain("factoryForm");
        expect(html).toContain("data-factory-save");
        expect(html).toContain("data-factory-reset");
        expect(html).not.toContain("onclick=");
        expect(html).not.toContain("onchange=");
    });

    it("creates the factory save payload from form data and checkbox states", () => {
        const formData = new FormData();
        formData.set("dns1", "1.1.1.1");

        const fakeForm = {
            [Symbol.iterator]: undefined,
        };
        const originalFormData = globalThis.FormData;
        globalThis.FormData = function FormDataMock(form) {
            expect(form).toBe(fakeForm);
            return formData;
        };

        try {
            expect(createFactoryPayload(fakeForm, {useStatic: true, mqttAuto: false})).toEqual({
                dns1: "1.1.1.1",
                use_static: true,
                mqtt_auto: false,
            });
        } finally {
            globalThis.FormData = originalFormData;
        }
    });
});
