import {describe, expect, it, vi} from "vitest";
import {resolveRoute, runRouteHandler} from "./router.helpers.js";

describe("router helpers", () => {
    it("uses dashboard as the default route", () => {
        expect(resolveRoute("").route).toBe("#/");
    });

    it("hides the development route outside development mode", () => {
        expect(resolveRoute("#/dev", {developMode: false})).toEqual({
            route: "#/dev",
            status: "not-found",
        });

        expect(resolveRoute("#/dev", {developMode: true})).toEqual({
            route: "#/dev",
            status: "ok",
        });
    });

    it("runs the matched route handler or falls back to notFound", async () => {
        const dashboard = vi.fn();
        const notFound = vi.fn();

        await runRouteHandler("#/", {"#/": dashboard, notFound});
        await runRouteHandler("#/missing", {"#/": dashboard, notFound});

        expect(dashboard).toHaveBeenCalledTimes(1);
        expect(notFound).toHaveBeenCalledTimes(1);
    });
});
