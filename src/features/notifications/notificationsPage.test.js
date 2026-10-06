import {describe, expect, it} from "vitest";
import {renderNotificationsPageShell} from "./notificationsPage.js";

describe("notifications page shell", () => {
    it("renders the notification list target and mark-read action", () => {
        const html = renderNotificationsPageShell({bellIcon: "<span>bell</span>"});

        expect(html).toContain("notificationsList");
        expect(html).toContain("data-notifications-mark-read");
        expect(html).toContain("اعلانات");
    });
});
