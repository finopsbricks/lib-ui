// @ts-check

/**
 * Send a custom Umami event. No-ops when the tracker isn't loaded (no env
 * vars, an excluded route, an ad blocker, or before the script initializes).
 *
 * @param {string} event_name - Event name, e.g. 'button_click'
 * @param {Record<string, any>} [event_data] - Ids and counts only, no page content
 * @returns {void}
 */
export function trackEvent(event_name, event_data) {
  if (typeof window === 'undefined') return;

  const umami = /** @type {any} */ (window).umami;
  if (!umami || typeof umami.track !== 'function') return;

  if (event_data) {
    umami.track(event_name, event_data);
  } else {
    umami.track(event_name);
  }
}
