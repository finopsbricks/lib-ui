'use client';

import { useEffect } from 'react';
import { identifyUser } from './identifyUser.js';

/**
 * Identify the Umami session with the signed-in user, once the tracker has
 * loaded, and again when the org changes. Render it once inside the signed-in
 * layout. Opaque ids only: never pass email or name.
 *
 * @param {{ userId?: string, orgId?: string }} props
 * @returns {null}
 */
export default function UmamiIdentify({ userId, orgId }) {
  useEffect(() => {
    if (!userId) return;
    const session_data = orgId ? { org_id: orgId } : undefined;

    // The tracker loads afterInteractive, so it may not be ready yet: poll briefly.
    if (identifyUser(userId, session_data)) return;

    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      if (identifyUser(userId, session_data) || tries >= 20) {
        clearInterval(timer);
      }
    }, 250);
    return () => clearInterval(timer);
  }, [userId, orgId]);

  return null;
}
