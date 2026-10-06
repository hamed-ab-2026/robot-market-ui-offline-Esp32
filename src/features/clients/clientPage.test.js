import {describe, expect, it} from "vitest";
import {bindClientPageEvents} from "./clientPage.js";

describe("client page events", () => {
    it("exports the client page event binder", () => {
        expect(typeof bindClientPageEvents).toBe("function");
    });
});
