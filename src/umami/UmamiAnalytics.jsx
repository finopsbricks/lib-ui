'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { umamiBeforeSend } from './umamiBeforeSend.js';
import { installAutocapture } from './autocapture.js';

const UMAMI_HOST_URL = process.env.NEXT_PUBLIC_UMAMI_HOST_URL;
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

// Staff tooling: staff sessions would pollute customer metrics.
const NO_TRACK_PREFIXES = ['/admin', '/staff'];

/**
 * Self-hosted Umami product analytics, mounted once in the app's root layout:
 * the before-send handler (strips ids from every URL), the tracker
 * (pageviews), the recorder (replays and heatmaps; the website's masking must
 * be strict) and the click, submit and download listeners. Renders nothing
 * when NEXT_PUBLIC_UMAMI_HOST_URL or NEXT_PUBLIC_UMAMI_WEBSITE_ID is unset.
 *
 * @returns {React.JSX.Element | null}
 */
export default function UmamiAnalytics() {
  const pathname = usePathname();
  const enabled =
    Boolean(UMAMI_HOST_URL && UMAMI_WEBSITE_ID) &&
    !NO_TRACK_PREFIXES.some((prefix) => pathname?.startsWith(prefix));

  useEffect(() => {
    if (enabled) return installAutocapture();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <Script id="umami-before-send" strategy="beforeInteractive">
        {`window.umamiBeforeSend = ${umamiBeforeSend.toString()};`}
      </Script>
      <Script
        src={`${UMAMI_HOST_URL}/script.js`}
        data-website-id={UMAMI_WEBSITE_ID}
        data-before-send="umamiBeforeSend"
        strategy="afterInteractive"
      />
      <Script
        src={`${UMAMI_HOST_URL}/recorder.js`}
        data-website-id={UMAMI_WEBSITE_ID}
        strategy="afterInteractive"
      />
    </>
  );
}
