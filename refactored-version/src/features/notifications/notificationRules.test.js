import {describe, expect, it} from "vitest";
import {countUnreadNotifications, getNotificationsFromPayload} from "./notificationRules.js";

describe("notification rules", () => {
    it("counts only unread notifications", () => {
        expect(countUnreadNotifications([
            {read: true},
            {read: false},
            {},
        ])).toBe(2);
    });

    it("normalizes invalid payloads to an empty list", () => {
        expect(getNotificationsFromPayload({notifications: [{id: 1}]})).toEqual([{id: 1}]);
        expect(getNotificationsFromPayload({notifications: null})).toEqual([]);
    });
});
