import {expect, test} from "@playwright/test";

test("login page switches between password and OTP flows", async ({page}) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Robot Market/);
    await expect(page.locator("#loginView")).toBeVisible();

    await page.locator(".tab").filter({hasText: "کد یکبار مصرف"}).click();
    await expect(page.locator("#usernameLabel")).toContainText("شماره موبایل");
    await expect(page.locator("#passField")).toBeHidden();

    await page.locator(".tab").filter({hasText: "ورود با رمز عبور"}).click();
    await expect(page.locator("#usernameLabel")).toContainText("نام کاربری");
    await expect(page.locator("#passField")).toBeVisible();
});

test("app page shows the protected admin shell in development mode", async ({page}) => {
    await page.addInitScript(() => {
        window.localStorage.setItem("rm_token", "playwright-dev-token");
    });

    await page.goto("/app.html");

    await expect(page).toHaveTitle(/پنل مدیریت/);
    await expect(page.locator("#app")).toBeAttached();
});
