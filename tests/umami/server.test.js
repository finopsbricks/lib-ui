import { describe, it, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { trackServerEvent } from '../../src/umami/server.js';

const ENV_KEYS = ['NEXT_PUBLIC_UMAMI_HOST_URL', 'NEXT_PUBLIC_UMAMI_WEBSITE_ID', 'NEXT_PUBLIC_APP_URL'];
const original_env = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));
const original_fetch = globalThis.fetch;

beforeEach(() => {
  process.env.NEXT_PUBLIC_UMAMI_HOST_URL = 'https://umami.example.com';
  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID = 'site-1';
  process.env.NEXT_PUBLIC_APP_URL = 'https://mdm.example.com';
  globalThis.fetch = mock.fn(async () => ({ ok: true, status: 200 }));
  mock.method(console, 'error', () => {});
});

afterEach(() => {
  for (const key of ENV_KEYS) {
    if (original_env[key] === undefined) delete process.env[key];
    else process.env[key] = original_env[key];
  }
  globalThis.fetch = original_fetch;
  mock.restoreAll();
});

describe('trackServerEvent()', () => {
  it('posts the event to /api/send with the user id as distinct id', async () => {
    await trackServerEvent('statement_upload', {
      user_id: 'user_1',
      org_id: 'org_1',
      url: '/api/v1/statements',
      data: { pages: 3 },
    });

    const [url, init] = fetch.mock.calls[0].arguments;
    assert.equal(url, 'https://umami.example.com/api/send');
    assert.equal(init.method, 'POST');
    assert.match(init.headers['User-Agent'], /^Mozilla\/5\.0/);
    assert.deepEqual(JSON.parse(init.body), {
      type: 'event',
      payload: {
        website: 'site-1',
        hostname: 'mdm.example.com',
        url: '/api/v1/statements',
        name: 'statement_upload',
        data: { pages: 3, org_id: 'org_1' },
        id: 'user_1',
      },
    });
  });

  it('sends nothing when the Umami env vars are unset', async () => {
    delete process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

    await trackServerEvent('statement_upload', { user_id: 'user_1' });

    assert.equal(fetch.mock.callCount(), 0);
  });

  it('never throws, and logs a failed event name once', async () => {
    globalThis.fetch = mock.fn(async () => {
      throw new Error('network down');
    });

    await trackServerEvent('export_failed_once', { user_id: 'user_1' });
    await trackServerEvent('export_failed_once', { user_id: 'user_1' });

    assert.equal(console.error.mock.callCount(), 1);
  });

  it('treats a non-2xx response as a failure', async () => {
    globalThis.fetch = mock.fn(async () => ({ ok: false, status: 400 }));

    await trackServerEvent('bad_request_event');

    assert.equal(console.error.mock.callCount(), 1);
    assert.match(String(console.error.mock.calls[0].arguments[1]), /400/);
  });
});
