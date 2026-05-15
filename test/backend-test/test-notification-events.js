"use strict";

const { describe, test } = require("node:test");
const assert = require("node:assert");
const {
    NOTIFICATION_EVENTS,
    notificationWantsEvent,
} = require("../../server/notification-events");

describe("notification event filter", () => {
    test("legacy config without subscriptions receives all types", () => {
        assert.strictEqual(notificationWantsEvent({ type: "webhook" }, NOTIFICATION_EVENTS.STATUS_UP), true);
        assert.strictEqual(notificationWantsEvent(null, NOTIFICATION_EVENTS.DOMAIN_EXPIRY), true);
    });

    test("explicit false skips that event only", () => {
        const cfg = {
            type: "webhook",
            eventSubscriptions: {
                statusUp: false,
                statusDown: true,
                tlsCertExpiry: true,
                domainExpiry: true,
            },
        };
        assert.strictEqual(notificationWantsEvent(cfg, NOTIFICATION_EVENTS.STATUS_UP), false);
        assert.strictEqual(notificationWantsEvent(cfg, NOTIFICATION_EVENTS.STATUS_DOWN), true);
        assert.strictEqual(notificationWantsEvent(cfg, NOTIFICATION_EVENTS.TLS_CERT_EXPIRY), true);
        assert.strictEqual(notificationWantsEvent(cfg, NOTIFICATION_EVENTS.DOMAIN_EXPIRY), true);
    });
});
