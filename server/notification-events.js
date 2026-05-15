/**
 * Keys stored under notification JSON `eventSubscriptions`.
 */
const NOTIFICATION_EVENTS = Object.freeze({
    STATUS_UP: "statusUp",
    STATUS_DOWN: "statusDown",
    TLS_CERT_EXPIRY: "tlsCertExpiry",
    DOMAIN_EXPIRY: "domainExpiry",
});

/**
 * @param {object|null|undefined} parsedConfig Notification object (parsed from DB JSON)
 * @param {string} event One of NOTIFICATION_EVENTS values
 * @returns {boolean} Whether this destination should receive the event
 */
function notificationWantsEvent(parsedConfig, event) {
    if (!parsedConfig || typeof parsedConfig !== "object") {
        return true;
    }
    const sub = parsedConfig.eventSubscriptions;
    if (!sub || typeof sub !== "object") {
        return true;
    }
    if (sub[event] === false) {
        return false;
    }
    return true;
}

module.exports = {
    NOTIFICATION_EVENTS,
    notificationWantsEvent,
};
