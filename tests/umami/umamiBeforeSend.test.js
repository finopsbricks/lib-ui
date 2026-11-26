import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { umamiBeforeSend } from '../../src/umami/umamiBeforeSend.js';

const send = (url, referrer) => umamiBeforeSend('event', { url, referrer });

describe('umamiBeforeSend()', () => {
  it('collapses the org id', () => {
    assert.equal(send('/orgs/abc123/overview').url, '/orgs/[id]/overview');
  });

  it("collapses statements' 12-character ids on their segments", () => {
    assert.equal(send('/orgs/o1/accounts/xyz-789').url, '/orgs/[id]/accounts/[id]');
    assert.equal(send('/orgs/o1/statements/s1').url, '/orgs/[id]/statements/[id]');
    assert.equal(send('/orgs/o1/rules/r1').url, '/orgs/[id]/rules/[id]');
    assert.equal(send('/orgs/o1/categories/office-supplies').url, '/orgs/[id]/categories/[id]');
    assert.equal(send('/orgs/o1/entities/acme-corp').url, '/orgs/[id]/entities/[id]');
  });

  it('keeps the segments after an id', () => {
    assert.equal(send('/orgs/o1/accounts/a1/transactions').url, '/orgs/[id]/accounts/[id]/transactions');
  });

  it('collapses numeric path segments', () => {
    assert.equal(send('/orgs/o1/objects/42/records/7').url, '/orgs/[id]/objects/[id]/records/[id]');
    assert.equal(send('/orgs/o1/objects/42?tab=fields').url, '/orgs/[id]/objects/[id]?tab=fields');
  });

  it('leaves numbers that are not whole segments alone', () => {
    assert.equal(send('/docs/v2-api').url, '/docs/v2-api');
    assert.equal(send('/x?page=2').url, '/x?page=2');
    assert.equal(send('http://localhost:3000/pricing').url, 'http://localhost:3000/pricing');
  });

  it('keeps content slugs and static paths', () => {
    assert.equal(send('/convert/hdfc-bank').url, '/convert/hdfc-bank');
    assert.equal(send('/').url, '/');
    assert.equal(send('/docs/getting-started').url, '/docs/getting-started');
  });

  it('collapses a UUID anywhere, including a query string', () => {
    assert.equal(send('/x?ref=550e8400-e29b-41d4-a716-446655440000').url, '/x?ref=[id]');
  });

  it('anonymizes a full-URL referrer and leaves an external one alone', () => {
    assert.equal(
      send('/pricing', 'https://statements.finopsbricks.com/orgs/o1/accounts/a1').referrer,
      'https://statements.finopsbricks.com/orgs/[id]/accounts/[id]',
    );
    assert.equal(send('/', 'https://www.google.com/').referrer, 'https://www.google.com/');
  });

  it('returns the payload so the send goes ahead', () => {
    const payload = { url: '/pricing' };
    assert.equal(umamiBeforeSend('event', payload), payload);
    assert.doesNotThrow(() => umamiBeforeSend('event', {}));
  });

  it('works after toString(), as UmamiAnalytics installs it', () => {
    const installed = new Function(`return ${umamiBeforeSend.toString()}`)();
    assert.equal(installed('event', { url: '/orgs/o1/objects/42' }).url, '/orgs/[id]/objects/[id]');
  });
});
