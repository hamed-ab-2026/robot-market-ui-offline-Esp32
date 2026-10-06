import {defineConfig} from "@playwright/test";

export default defineConfig({
    testDir: "./e2e",
    webServer: {
        command: "npm run dev -- --host 127.0.0.1 --port 5174",
        url: "http://127.0.0.1:5174",
        reuseExistingServer: !process.env.CI,
    },
    use: {
        baseURL: "http://127.0.0.1:5174",
        launchOptions: {
            executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || "/snap/bin/chromium",
        },
    },
});
