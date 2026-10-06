import {describe, expect, it} from "vitest";
import {renderBalancePageShell} from "./balancePage.js";

describe("balance page shell", () => {
    it("renders balance rows and data-driven actions", () => {
        const html = renderBalancePageShell({
            payIcon: "<span>pay</span>",
            clients: [{name: "Ali", id: "1", balance: 5000}],
        });

        expect(html).toContain("Ali");
        expect(html).toContain("balance0");
        expect(html).toContain("data-balance-apply-all");
        expect(html).toContain("data-balance-save");
        expect(html).toContain("data-balance-export");
    });
});
