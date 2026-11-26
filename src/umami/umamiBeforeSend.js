// @ts-check

/**
 * Umami `data-before-send` handler. Rewrites the `url` and `referrer` of every
 * payload so record ids never reach the analytics store and pages group by
 * route: `/orgs/<anything>` and statements' 12-character ids
 * (`/accounts/<id>`, `/statements/<id>`, …) become `[id]`, as do every UUID
 * and every numeric path segment. Content slugs (`/convert/hdfc-bank`) are
 * left alone.
 *
 * IMPORTANT: keep it self-contained (no module-scope references).
 * `UmamiAnalytics` serializes it with `toString()` into a `beforeInteractive`
 * inline script, so it is installed before the tracker's first beacon.
 *
 * @param {string} type - Umami payload type
 * @param {{ url?: string, referrer?: string }} payload - Mutated in place
 * @returns {object} the payload to send
 */
export function umamiBeforeSend(type, payload) {
  const anonymize = (value) => {
    if (typeof value !== 'string' || value === '') return value;
    return value
      .replace(
        /\/(orgs|accounts|statements|rules|categories|entities)\/[^/?#]+/g,
        '/$1/[id]',
      )
      .replace(
        /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g,
        '[id]',
      )
      .replace(/\/\d+(?=[/?#]|$)/g, '/[id]');
  };

  if (payload && typeof payload === 'object') {
    if (payload.url) payload.url = anonymize(payload.url);
    if (payload.referrer) payload.referrer = anonymize(payload.referrer);
  }

  return payload;
}
