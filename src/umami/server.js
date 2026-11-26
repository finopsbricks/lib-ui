// @ts-check

// Umami drops requests whose User-Agent looks like a bot (isbot); this one passes.
const USER_AGENT = 'Mozilla/5.0 (compatible; fob-lib-ui)';

const logged_failures = new Set();

/**
 * Send a server-side event to the app's Umami website, with the user id as the
 * distinct id so it joins that user's browser sessions. Call it after writing
 * the app's EventLogs row. Never throws: returns quietly when
 * NEXT_PUBLIC_UMAMI_HOST_URL or NEXT_PUBLIC_UMAMI_WEBSITE_ID is unset, and logs
 * a failed send once per event name.
 *
 * @param {string} name - Event name, e.g. 'statement_upload'
 * @param {{ user_id?: string, org_id?: string, url?: string, data?: Record<string, any> }} [options]
 *   `data` holds ids and counts only: no names, emails or amounts
 * @returns {Promise<void>}
 */
export async function trackServerEvent(name, { user_id, org_id, url, data } = {}) {
  const host_url = process.env.NEXT_PUBLIC_UMAMI_HOST_URL;
  const website_id = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!host_url || !website_id) return;

  try {
    const app_url = process.env.NEXT_PUBLIC_APP_URL;
    const response = await fetch(`${host_url}/api/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': USER_AGENT },
      body: JSON.stringify({
        type: 'event',
        payload: {
          website: website_id,
          hostname: app_url ? new URL(app_url).hostname : undefined,
          url,
          name,
          data: { ...data, org_id },
          id: user_id,
        },
      }),
    });
    if (!response.ok) throw new Error(`Umami responded ${response.status}`);
  } catch (error) {
    if (logged_failures.has(name)) return;
    logged_failures.add(name);
    console.error(`[umami] ${name} not sent:`, error);
  }
}
