import {describe, expect, it} from "vitest";
import {bindDevelopPageEvents} from "./developPage.js";

describe("develop page events", () => {
    it("exports the develop page binder", () => {
        expect(typeof bindDevelopPageEvents).toBe("function");
    });
});
