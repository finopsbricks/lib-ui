import { describe, it, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { trackEvent } from '../../src/umami/trackEvent.js';
import { identifyUser } from '../../src/umami/identifyUser.js';

beforeEach(() => {
  globalThis.window = {};
});

afterEach(() => {
  delete globalThis.window;
});

describe('trackEvent()', () => {
  it('sends the name and data when the tracker is loaded', () => {
    const track = mock.fn();
    window.umami = { track };

    trackEvent('button_click', { label: 'Save' });

    assert.deepEqual(track.mock.calls[0].arguments, ['button_click', { label: 'Save' }]);
  });

  it('sends only the name when there is no data', () => {
    const track = mock.fn();
    window.umami = { track };

    trackEvent('pricing_viewed');

    assert.deepEqual(track.mock.calls[0].arguments, ['pricing_viewed']);
  });

  it('does nothing when the tracker is not loaded', () => {
    assert.doesNotThrow(() => trackEvent('anything', { a: 1 }));
    window.umami = {};
    assert.doesNotThrow(() => trackEvent('anything'));
  });
});

describe('identifyUser()', () => {
  it('identifies with the user id and session data', () => {
    const identify = mock.fn();
    window.umami = { identify };

    assert.equal(identifyUser('user_1', { org_id: 'org_1' }), true);
    assert.deepEqual(identify.mock.calls[0].arguments, ['user_1', { org_id: 'org_1' }]);
  });

  it('identifies with only the user id when there is no session data', () => {
    const identify = mock.fn();
    window.umami = { identify };

    identifyUser('user_1');

    assert.deepEqual(identify.mock.calls[0].arguments, ['user_1']);
  });

  it('returns false without a user id or a loaded tracker', () => {
    const identify = mock.fn();
    window.umami = { identify };
    assert.equal(identifyUser(''), false);
    assert.equal(identify.mock.callCount(), 0);

    window.umami = {};
    assert.equal(identifyUser('user_1'), false);
  });
});
