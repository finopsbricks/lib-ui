// @ts-check
import { umamiBeforeSend } from './umamiBeforeSend.js';
import { trackEvent } from './trackEvent.js';

const DOWNLOAD_PATH = /export|\.(csv|xlsx|pdf|zip)$/i;
const MAX_LABEL_LENGTH = 60;

/**
 * The event a click sends: `file_download` or `link_click` for a link,
 * `button_click` for a button. Null for anything else, and for elements inside
 * `[data-umami-event]`, which the tracker sends itself.
 *
 * @param {EventTarget | null} target
 * @returns {{ name: string, data: Record<string, string> } | null}
 */
export function describeClick(target) {
  if (!(target instanceof Element)) return null;
  if (target.closest('[data-umami-event]')) return null;

  const element = target.closest('a[href], button, [role="button"]');
  if (!element) return null;

  if (element instanceof HTMLAnchorElement) {
    // Query strings and hashes are dropped: they can carry search terms.
    const url = new URL(element.href, window.location.href);
    const path = url.origin === window.location.origin ? url.pathname : url.origin + url.pathname;
    const is_download = element.hasAttribute('download') || DOWNLOAD_PATH.test(url.pathname);
    return {
      name: is_download ? 'file_download' : 'link_click',
      data: { href: umamiBeforeSend('event', { url: path }).url },
    };
  }

  const label =
    element.getAttribute('data-umami-label') ||
    element.getAttribute('aria-label') ||
    (element.textContent || '').replace(/\s+/g, ' ').trim();
  return { name: 'button_click', data: { label: label.slice(0, MAX_LABEL_LENGTH) || 'unlabeled' } };
}

/**
 * The event a form submit sends: the form's `name` or `id`, never field values.
 *
 * @param {EventTarget | null} target
 * @returns {{ name: string, data: Record<string, string> } | null}
 */
export function describeSubmit(target) {
  if (!(target instanceof HTMLFormElement)) return null;
  if (target.closest('[data-umami-event]')) return null;
  return { name: 'form_submit', data: { form: target.getAttribute('name') || target.id || 'unnamed' } };
}

/**
 * Listen for clicks and submits on the document (capture phase) and send them
 * to Umami.
 *
 * @returns {() => void} removes the listeners
 */
export function installAutocapture() {
  const onClick = (event) => {
    const described = describeClick(event.target);
    if (described) trackEvent(described.name, described.data);
  };
  const onSubmit = (event) => {
    const described = describeSubmit(event.target);
    if (described) trackEvent(described.name, described.data);
  };

  document.addEventListener('click', onClick, true);
  document.addEventListener('submit', onSubmit, true);
  return () => {
    document.removeEventListener('click', onClick, true);
    document.removeEventListener('submit', onSubmit, true);
  };
}
