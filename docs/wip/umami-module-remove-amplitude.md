# Add `@fob/lib-ui/umami`, Remove Amplitude (v0.9.0)

## Status: NOT STARTED
## Priority: P3: every app's move off Amplitude waits on this release
## Bet: finopsbricks

Add the Umami module that every app uses for product analytics (tracker, recorder, autocapture of
clicks, submits and downloads, identify, server events), and remove `./amplitude` and its
packages. Released as `v0.9.0`. Step 1 of the rollout tracked in
`finopsbricks/ops/devops/docs/wip/rollout-umami-replace-amplitude-all-apps.md`.

---

## Problem Statement

`src/components/AmplitudeProvider.jsx` and `AmplitudeUserIdentifier.jsx` (exported as
`./amplitude`) record every session with text unmasked (`sessionReplayPlugin({ sampleRate: 1 })`),
use a hard-coded fallback API key, and identify users by email, sending email and name. Twelve apps
mount them. Decision `finopsbricks/ops/devops/docs/decisions/0001-umami-replaces-amplitude-in-every-app.md`
replaces Amplitude with the self-hosted Umami everywhere, matching the features Amplitude gave.

## Proposed Solution

Build what the standard describes:
`~/ec2code/alex/engineering-standards/architecture/analytics/umami-product-analytics.md`.
Start from statements' working code (`statements.finopsbricks.com/src/components/UmamiAnalytics.jsx`,
`UmamiIdentify.jsx`, `src/utils/analytics/`) and its tests (`tests/utils/analytics/`).

```
src/umami/
├── index.js               # client: UmamiAnalytics, UmamiIdentify, trackEvent, identifyUser
├── UmamiAnalytics.jsx     # before-send handler, script.js, recorder.js, listeners; /admin, /staff skipped
├── UmamiIdentify.jsx      # identify(user_id, { org_id }) once the tracker loads
├── umamiBeforeSend.js     # /orgs/[id], UUIDs, numeric segments → [id]
├── autocapture.js         # click / submit / download listeners
└── server.js              # trackServerEvent(); no 'use client'
```

`package.json` exports: `./umami` → `src/umami/index.js`, `./umami/server` → `src/umami/server.js`.

- **`UmamiAnalytics`** takes no props: it reads `NEXT_PUBLIC_UMAMI_HOST_URL` and
  `NEXT_PUBLIC_UMAMI_WEBSITE_ID` (Next inlines them in the app's bundle, as it did
  `NEXT_PUBLIC_AMPLITUDE_API_KEY` here) and renders nothing when either is unset.
- **`autocapture.js`** adds one `click` and one `submit` listener on `document` (capture phase,
  removed on unmount) and sends, through `trackEvent`:
  - `file_download` `{ href }` for a link with `download` or an `href` to an export or a
    `.csv`/`.xlsx`/`.pdf`/`.zip`;
  - `link_click` `{ href }` for other links (`href` through `umamiBeforeSend`'s rule);
  - `button_click` `{ label }` for `button` and `[role="button"]`: `data-umami-label`, else
    `aria-label`, else trimmed text, at most 60 characters;
  - `form_submit` `{ form }`: the form's `name` or `id`, else `unnamed`; never field values.

  Elements inside `[data-umami-event]` are skipped (the tracker sends those itself).
- **`trackServerEvent(name, { user_id, org_id, url, data })`** posts
  `{ type: 'event', payload: { website, hostname, url, name, data: { ...data, org_id }, id: user_id } }`
  to `${NEXT_PUBLIC_UMAMI_HOST_URL}/api/send` with a `User-Agent` header (Umami drops requests
  without one as bots). It returns quietly when the env vars are unset, catches every error, and
  logs a failure once per event.
- **Remove:** `src/amplitude.js`, `AmplitudeProvider.jsx`, `AmplitudeUserIdentifier.jsx`, the
  `./amplitude` export, `@amplitude/analytics-browser` and `@amplitude/plugin-session-replay-browser`.
- **CHANGELOG** `0.9.0`: Added (the module), Removed (`./amplitude`), and "What apps must do":
  replace `AmplitudeProvider` with `<UmamiAnalytics />` and `AmplitudeUserIdentifier` with
  `<UmamiIdentify userId orgId />`, and set the two env vars.

## Open Questions (check on `umami.finopsbricks.com`, v3.2.0, before Phase 2)

- Does the recorder call the `data-before-send` handler too? If not, replay URLs carry ids, and
  the recorder needs its own way to strip them (or the gap goes in the standard as a known
  limitation).
- Does `/api/send` accept `id` as the distinct id in this version, so server events join the
  user's browser session? If not, send `user_id` in `data` instead.

## Implementation Phases

### Phase 1: Check the two open questions ❌
- [ ] Read Umami 3.2.0's tracker and recorder source (or test against the instance) for `data-before-send` in the recorder
- [ ] Send one test event to `/api/send` with `id` and see it in the dashboard; delete the test website afterwards
- [ ] Update this WIP and the standard with the answers

### Phase 2: Client module ❌
- [ ] `src/umami/umamiBeforeSend.js`, `UmamiAnalytics.jsx`, `UmamiIdentify.jsx`, `autocapture.js`, `index.js`
- [ ] Tests: port statements' three test files (`identifyUser`, `trackEvent`, `umamiBeforeSend`) and add autocapture cases (each event, `data-umami-label`, skipping `[data-umami-event]`, no field values). lib-ui only runs Storybook tests, so use Node's built-in runner (`node --test`, no new dependency) if the files load under Node, else Storybook play stories; add it to CI
- [ ] Story `Umami/Autocapture` with a fake `window.umami`, showing what each click sends
- [ ] Commit

### Phase 3: Server module ❌
- [ ] `src/umami/server.js` (`trackServerEvent`) with tests for the payload, missing env, and a failed fetch
- [ ] Commit

### Phase 4: Remove Amplitude and release ❌
- [ ] Delete the Amplitude files, export and packages; `grep -ri amplitude src package.json README.md CLAUDE.md` finds nothing
- [ ] `exports` gains `./umami` and `./umami/server`
- [ ] `CHANGELOG.md` 0.9.0 with "What apps must do"; version `0.9.0` in `package.json`
- [ ] `npm run storybook:test:ci` and the new tests pass
- [ ] Commit, tag `v0.9.0`, push with the tag
- [ ] Mark ✅ in the rollout WIP

## Related Files

- `src/components/AmplitudeProvider.jsx`, `src/components/AmplitudeUserIdentifier.jsx`, `src/amplitude.js` - delete
- `src/umami/` - new
- `package.json` - exports, dependencies, version
- `CHANGELOG.md` - 0.9.0
- `statements.finopsbricks.com/src/components/UmamiAnalytics.jsx`, `UmamiIdentify.jsx`, `src/utils/analytics/` - the code to start from
