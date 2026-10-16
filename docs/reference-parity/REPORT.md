# Reference interaction comparison and corrections

Reference: https://www.redoyanulhaque.me/. Local source-based application: Akash Sakhare portfolio, React/Vite.

## What was different

| Area | Observed difference | Correction / retained content difference |
| --- | --- | --- |
| Active application | Port 3000 served the earlier Next.js recreation; the cloned source was on 5173. Same page titles hid the distinction. | Verified the old Next processes by workspace command line, stopped them, and served the actual Vite clone on 3000. Root and archived-project npm commands now forward to the clone. Original Next commands remain under legacy:* scripts. |
| Hero | At 1440px, normal-motion WebGL path already tracked the pointer, matching the reference. A slow load permanently unmounted the scene after 20 seconds. | The loader deadline now shows HTML content while a healthy scene continues loading. It automatically replaces the temporary still when ready. Actual context failure still uses the fallback. |
| Ready state and scrolling | Deadline-based loader dismissal could skip initialFX, leaving Lenis stopped and initial reveals missing. | Page-ready initialization belongs to the provider whenever loading ends, independently of loader UI. |
| Cursor | A static scene fallback also hid the cursor. Hover handlers were bound only to elements available at mount. | Restored the violet trailing cursor on fine pointers regardless of WebGL; delegated hover behavior handles links and social docking. Live motion-preference changes clean up and restore the cursor. |
| About | Original character/camera transition and paragraph reveal match the source. | Akash summary replaces reference-owner biography. Different words produce different line lengths. |
| Services | Using innerText in the splitter converted the heading's nested layout div into a new line. Long FRONTEND DEVELOPER title wrapped inside the original card. | Preserve only authored br breaks, flatten nested layout divs as in the reference. Use the accurate, shorter WEB DEVELOPER label. Desk/monitor choreography and expandable panels retain original styles. |
| Experience | Progression setup was inside the 3D component, so it disappeared when 3D was unavailable. | Set up the timeline with the page. Two supplied career/education items replace the owner's seven entries; no invented jobs or dates fill the remaining space. |
| Projects | Long supplied categories and full technology lists changed card density. | Concise, factual card summaries match the original density. Full project information remains on case-study pages. The original horizontal desktop interaction remains. |
| Technologies | Pyramid, video and hover presentation retain the source layout. | Skills/icons use Akash's supplied technologies; row contents differ from the reference owner's AI/Python stack. |
| Contact/footer | Same layout, fewer actual social links and no supplied resume or location. | Actual email/GitHub are linked; absent information remains labeled or omitted. No reference-owner contact links are used as Akash's. |

[Side-by-side screenshots for every homepage section](comparison.html). The left/right hero captures visually show head/gaze response. These are browser observations and screenshots, not a pixel-equality certification. The original component stylesheet files and original model/HDR assets remain unchanged; fallback/accessibility rules are additive.

## Verification

- The first targeted production run executed ten cases: **6 passed, 2 failed, 2 skipped**. Cursor and unsupported-WebGL/reduced-motion checks passed in Chrome, Firefox and WebKit. [Raw initial results](playwright-initial-results.json).
- Failed delayed-load test: its virtual clock was installed after the real timeout was registered. Replaced it with a held model request and the real loader deadline.
- Failed normal scene scroll test exposed the loader-ready/Lenis race described above; corrected before the final rerun.
- Live Playwright MCP verification after the correction: port 3000 contains no Next.js runtime, body becomes character-ready, cursor becomes cursor-active, About navigation moves scrollY from 0 to 900 and changes character transform from x=-712.333 to x=-1068.5 at 1440px. All seven homepage areas were captured after transitions settled, document overflow was false, service text opacity was 1, and the fresh walkthrough recorded zero JavaScript page errors.
- Final `npm.cmd run lint`, `npm.cmd run typecheck` (`tsc -b`) and `npm.cmd run build` all passed (exit 0). The production build transformed 120 modules without warnings.
- Final production Chrome rerun: **4 passed, 0 failed**, 1.7 minutes. Cursor movement/link-hover/social-docking/preference recovery; actual delayed-model/static-to-3D recovery; reduced motion/unsupported WebGL; original 3D pointer interaction, desk choreography and offscreen render pause all passed. [Raw final results](playwright-final-chrome.json).
- Firefox and WebKit cursor/fallback checks passed in the initial targeted run; the final loader-ready correction was retested in Chrome. This follow-up did not rerun the earlier complete 43-case suite or Lighthouse.

## Limits

Reduced motion, touch/mobile and unsupported WebGL retain an accessible static presentation. The reference itself uses a non-3D mobile hero; no personal portrait was provided, so our mobile hero uses the licensed character still. Content length, career entry count, project covers and available social links intentionally differ. The original template's AI chat was previously replaced by a factual local guide and remains labeled accordingly. No physical-device or manual screen-reader run was performed this turn. Earlier Lighthouse measurements are in the earlier report; no new performance score is claimed here. Nothing was deployed or published.

## Files changed in this follow-up

- Workspace package.json and README.md; archived futuristic-portfolio/package.json startup scripts.
- src/context/useLoading.ts, LoadingProvider.tsx; src/components/Loading.tsx.
- src/components/Character/Scene.tsx, Cursor.tsx, MainContainer.tsx.
- src/accessibility.css, src/utils/textSplitter.ts, src/config.ts.
- package.json, README.md; tests/e2e/parity.spec.ts, scene.spec.ts.
- docs/reference-parity comparison, screenshots and test artifacts; previous report follow-up note.

## Hero text overflow follow-up

Bound the desktop role column, replaced the inherited 150% heading width, applied responsive font sizes and wrapping, and removed the fade overlay that obscured wrapped title text. Playwright measured actual text ranges at 360, 390, 768, 1024, 1025, 1280, 1440 and 1920px; both roles remained within the viewport. Normal-motion/3D checks also passed at 1025, 1280, 1440 and 1920px. [Updated hero screenshot](hero-text-fixed.png). Lint and production build passed.

## Social link hover follow-up

Reproduced icon anchors at their slot corners instead of centered (28px icon anchor centered on the slot origin). The old animation also moved the clickable anchor itself. Replaced this with stable 50px links centered in their slots; only SVGs move, bounded to 6px, and return to center on exit/blur. Removed four permanent per-icon animation loops. Cursor docking no longer uses a competing CSS transform transition, and icon color follows the actual docked cursor state; reduced-motion icons remain light and readable.

Playwright MCP confirmed all four stable hit areas, correct dock alignment (cursor x=32.7448 versus expected x=32.74479), docking reset, readable reduced-motion icons, and GitHub/LinkedIn/Instagram popup destination URLs. External popup documents were intercepted during this check; it verifies correct navigation targets, not external service uptime. [Hover screenshot](social-hover-fixed.png). Production cross-browser regression results are in [social-hover-tests.json](social-hover-tests.json).

Social-hover regression: **3 passed, 0 failed** (Chrome, Firefox, WebKit), 2.1 minutes. Final lint and production build also passed (exit 0); the build includes the final dock-state contrast correction. Changed SocialIcons.tsx, additive accessibility CSS, and the existing parity regression test.
