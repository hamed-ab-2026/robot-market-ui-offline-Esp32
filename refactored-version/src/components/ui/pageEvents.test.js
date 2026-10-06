import {describe, expect, it} from "vitest";
import {bindDrawerPageEvents} from "./pageEvents.js";

describe("page events", () => {
    it("exports the common drawer page binder", () => {
        expect(typeof bindDrawerPageEvents).toBe("function");
    });
});
