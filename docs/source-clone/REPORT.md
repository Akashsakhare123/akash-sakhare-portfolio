> Follow-up: the active development port is now **3000**. Loader, cursor and animation recovery corrections and newer evidence are recorded in [the interaction parity report](../reference-parity/REPORT.md). The results below are the earlier run.

﻿# Original-source portfolio implementation

Source: https://github.com/red1-for-hek/portfolio-website

Pinned clone commit: `e1491d6d709d4fa6df2ca88277f0c31b5e4f6ea7`.

The repository was cloned into `akash-portfolio`. Its original MIT license is preserved. The previous Next.js project in `futuristic-portfolio` was left intact. This new implementation runs the original React/Vite application, not the earlier visual recreation.

## Design fidelity

All tracked files under `src/components/styles/` remain unchanged from the source commit. The original `character.glb`, encrypted model copy and HDR environment are unchanged. Desktop uses the actual source model, camera parameters, lighting, typing/intro/face animations and monitor/desk scroll choreography. Navigation, loading screen, horizontal work panels, technology pyramid/video, all-works page and chess page come from the original source.

Changes to visible content use Akash's supplied information. The mobile/unsupported-device image is a still of that same character because no personal portrait was supplied. Unavailable project screenshots use explicitly labeled covers. Unknown location, resume, LinkedIn and dates are not fabricated. A fifth project documents this actual MIT-template personalization, preserving the original five-panel work layout without inventing another client project.

## Runtime decisions and fixes

- Runtime cleanup corrects upstream leaked animation frames, event listeners, scroll triggers and repeated loader timers.
- Tablet widths originally waited for a scene that was never mounted. Tablet, reduced-motion and no-WebGL devices now bypass the loader and use the matching static avatar.
- A 20-second failure bound prevents a failed model from locking the entire site. The character pauses rendering after it is offscreen and when the tab is hidden. DPR is capped at 1.5.
- Scene geometry and styles are unchanged. Direct loading of the supplied plain GLB avoids redundant encryption/decryption work; the model content is identical to the supplied encrypted copy.
- The original Lenis behavior remains on desktop. Hash/history updates and cleanup are corrected; mobile/reduced-motion scrolling remains native.
- Keyboard focus, service-panel operation, chess-square buttons, chat labels and announcements are additive accessibility fixes. The repeated hover-link text is hidden from screen readers.
- Reduced motion freezes the decorative glow at its original first-frame position; simply disabling its animation left a bright glow behind the logo and failed contrast.
- The original background video plays only near the viewport and when motion preferences permit it.
- Directly loaded project/game routes can scroll, correcting the upstream global body lock.
- Geist and the technology icons are local. Font, icon and Stockfish license notices are included. Original GitHub/author references remain only for attribution, not as Akash's contact links.
- The original game is functional but is labeled a template demo, with no invented ELO rating or claim of authorship. The chat UI uses a local guide based on supplied facts; no API credentials or external AI service are needed.
- Original Three.js loader imports are narrowed and Vite uses its default esbuild minifier. These build changes preserve rendered behavior and remove the upstream unrelated Lottie/eval build warning.

## Content modules

`src/data/profile.ts`, `experience.ts`, `education.ts`, `skills.ts` and `projects.ts` contain the supplied facts. `src/config.ts` maps them into the template's original component shape. `src/data/technologies.ts` lists related, supplied skills rather than retaining the original owner's AI/Python skill set. Project details reuse the original all-works styling at `/projects/:slug`.

## Verification

- `npm.cmd run lint`: passed (exit 0).
- `npm.cmd run typecheck` (`tsc -b`): passed (exit 0).
- `npm.cmd run build`: passed (exit 0), 120 modules, no build warnings.
- Initial production Playwright run: **40 passed, 3 failed**, 43 total, 13.9 minutes. The raw initial result is preserved in [playwright-initial-results.json](playwright-initial-results.json).
- All six widths (360, 390, 768, 1024, 1440, 1920px) across all eight routes passed in Chrome, Firefox and WebKit. Navigation/contact targets, supplied content, missing-field labels, asset availability and unknown-route recovery passed in all three engines.
- Axe WCAG 2/2.1 A/AA audits across all eight routes returned zero violations in all three engines. This is automated coverage, not a complete accessibility certification.
- Chrome's actual 3D render, pointer interaction, original desk choreography and offscreen render-pause check passed. Console and page errors are collected by the tests; assertions were clean in passing interaction checks.
- Initial failures: Firefox/WebKit unsupported-WebGL scenario and Firefox chess response. The fallback test was inadvertently enabling the real scene before applying its WebGL mock; the harness now installs the mock first. Work pinning now also depends on the actual 3D capability state, so unsupported devices retain native scrolling. Chess search now has a 1.2-second engine thinking budget instead of unbounded depth-only work. Browser startup/scheduling can add latency beyond that budget.
- Intermediate retest: **8 passed, 1 failed** across nine keyboard/fallback/game checks; Firefox still could not activate a zero-width lazy image link. [Raw intermediate results](playwright-intermediate-results.json). The final correction adds intrinsic dimensions to work-card images, reserving clickable space before loading.
- Final fallback retest: **3 passed** (Chrome, Firefox, WebKit). In the same four-test run, the desktop 3D check timed out waiting 20 seconds for `character-ready`; it had passed in the initial complete run. [Raw fallback/scene results](playwright-fallback-results.json). The isolated desktop rerun **passed (1/1, 32.0 seconds)** on the final build, including pointer interaction, desk choreography and offscreen pause. [Raw isolated results](playwright-results.json). This does not erase the earlier initialization timeout. There was no single all-green full-suite rerun after the final image-dimension correction. No earlier project's test counts or performance scores apply to this cloned application.

[Complete changed-file list](changed-files.md).

## Performance measurements

| Lighthouse preset | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| mobile | 62 | 94 | 100 | 92 | 3.5 s | 1,370 ms | 0 |
| desktop | 35 | 94 | 100 | 92 | 6.0 s | 13,100 ms | 0.002 |

Both audits ran against the final local production application with normal motion enabled. [Mobile HTML](lighthouse-mobile.report.html), [mobile JSON](lighthouse-mobile.report.json), [desktop HTML](lighthouse-desktop.report.html), [desktop JSON](lighthouse-desktop.report.json). Mobile Lighthouse warned that the host CPU was slower than expected. These are single lab samples, not field Core Web Vitals or proof of real-device smoothness.

Chrome DevTools MCP also recorded a 390x844/DPR1 mobile navigation, CPU 1x and no network throttling: **LCP 496 ms, CLS 0.00, TTFB 7 ms**. [Observed metrics and conditions](devtools-mobile-metrics.json). The tool rejected custom trace-export paths; tracing succeeded without an export path. No INP or CrUX field data was available. Different throttling and cache conditions mean this result should not be compared directly with Lighthouse's simulated mobile result.

Remaining performance/accessibility findings:

- The retained desktop 3D experience has substantial initialization/main-thread cost in the desktop lab audit. Its visual behavior passes the isolated functional test, but desktop performance is not claimed to be optimized to a passing Lighthouse score.
- One repeated 3D startup timed out at the 20-second readiness assertion; the initial full run and isolated final rerun passed. Slow scene initialization remains an observed reliability limitation. The application includes a bounded static fallback.
- Lighthouse reports nonsequential heading levels and undersized touch targets inherited from the original visual structure. Its accessibility score is 94; the separate WCAG 2/2.1 A/AA axe checks passed. These cover different rule sets.
- Final Playwright MCP checks of project-link dimensions and document overflow at 360, 390, 768, 1440 and 1920px found nonzero links and no horizontal page overflow. [Final project-card screenshot](screenshots/final-project-cards.png). A final mobile hero screenshot was refreshed after the fixes.

## Scope and limitations

This is a React/Vite client-rendered application because it retains the provided repository's stack. The prior Next.js app remains separate. A private/optional Groq API example from the upstream repo is not called by the local guide, and no API key was added. No physical mobile device or manual NVDA/VoiceOver run has been performed. Automated engine tests are not a claim of physical Safari testing.

Nothing has been deployed, published, committed, pushed, emailed or sent to an external account.

## Reproduction and evidence

- Run `npm run dev` from `akash-portfolio` for the source-based design (normally port 5173).
- Run `npm run build` then `npm run test:e2e` for repeatable production QA on port 4173.
- [Original-source integrity proof](provenance.json) records the source commit, unchanged visual assets, model hash, and verified equality of the plain/decrypted model.
- [Desktop 3D render](screenshots/production-desktop-3d.png)
- [Desktop desk choreography](screenshots/production-desktop-desk.png)
- [Mobile hero](screenshots/mobile-hero.png)
- [Full-page Chrome desktop](screenshots/chrome-home-1440.png)
- [Full-page Chrome mobile](screenshots/chrome-home-390.png)
- [FlyHigh case study](screenshots/chrome-flyhigh-390.png)
- [Machine-readable browser results](playwright-results.json)

Screenshot captures document the actual rendered build. There is no pre-existing automated pixel-diff baseline; original stylesheet/model integrity and manual source/reference comparison are separate evidence of fidelity.
