// @ts-check

/**
 * Associate the current Umami session with a signed-in user. No-ops when the
 * tracker isn't loaded yet. Pass opaque ids only, never email or name.
 *
 * @param {string} user_id - Opaque user id
 * @param {Record<string, any>} [session_data] - e.g. { org_id }
 * @returns {boolean} true if identify was called
 */
export function identifyUser(user_id, session_data) {
  if (typeof window === 'undefined') return false;
  if (!user_id) return false;

  const umami = /** @type {any} */ (window).umami;
  if (!umami || typeof umami.identify !== 'function') return false;

  if (session_data) {
    umami.identify(user_id, session_data);
  } else {
    umami.identify(user_id);
  }
  return true;
}
