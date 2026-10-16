# Akash Sakhare — original-source portfolio

Production: https://akash-sakhare-portfolio.vercel.app

This is the active source-based implementation cloned from https://github.com/red1-for-hek/portfolio-website at commit `e1491d6d709d4fa6df2ca88277f0c31b5e4f6ea7`.

The original component stylesheets, character model, lighting assets and scene choreography are retained. Profile content is personalized for Akash Sakhare.

## Local commands

From this directory:

```sh
npm install
npm run dev
```

Vite prints the local preview URL, normally http://localhost:3000. To use a chosen port, run `npm run dev -- --port 3000 --strictPort`.

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
npm run test:e2e
```

On Windows, use `npm.cmd` or `npx.cmd` if PowerShell restricts npm scripts. Type checking uses `tsc -b` because this repository has separate application and Vite project references. The browser tests use a production build on port 4173. Install Playwright browser engines with `npx playwright install firefox webkit` if needed; the Chrome project uses installed Google Chrome.

## Personalization

- `src/data/profile.ts`: supplied name, role, summary, email, GitHub, and resume-confirmed phone, Pune location, LinkedIn and downloadable PDF.
- `src/data/projects.ts`: four supplied project descriptions, contributions, architecture and outcomes.
- `src/data/experience.ts`, `education.ts`, `skills.ts`: supplied professional information. Employment (Oct 2024 - Present) and education years (2019 - 2023) are confirmed by the supplied resume; other missing facts are never inferred.
- `src/config.ts`: maps those facts to the original template's layout. The portfolio itself is a fifth, explicitly attributed template-personalization project.
- `src/data/technologies.ts`: only technologies from the supplied skill set; icons are served locally.
- `public/images/akash-mobile-hero.jpeg`: Akash's mobile hero portrait. `avatar-static.png` remains the fallback artwork for the chess demonstration.
- `public/projects/`: actual Trinade website reference plus clearly labeled illustrative covers for projects without screenshots.

The original chess page remains available at `/play`. Its engine is a template demonstration and has no claimed ELO rating or authorship by Akash. The chat panel is a working **local portfolio guide**, answering from supplied facts without an API key. It is not presented as a live generative-AI service.

## Runtime and accessibility fixes

The template's loader now has cleanup and a bounded failure path. A slow healthy scene continues loading after the loader deadline, then automatically replaces the temporary still. Page-ready effects and scrolling initialize independently of the loading-screen component. Cursor and career progression no longer depend on successful WebGL initialization. Tablet, reduced-motion and unsupported-WebGL users bypass the expensive scene. The original 3D model still drives the desktop experience, including pointer response and the monitor/desk choreography. Rendering stops after the character is offscreen and when the document is hidden; event handlers, animation frames and scroll triggers are cleaned up on navigation. Technology background video plays only when nearby and allowed by motion preferences.

Navigation preserves native hash/history behavior while retaining desktop Lenis. Project detail pages reuse the original visual language. Keyboard focus, service controls, chess squares and chat status labels are accessible. `src/accessibility.css` provides additive fallback and accessibility rules; it does not replace the original design.

Geist and skill icons are local assets. Font, icon and chess-engine license notices are retained alongside the original MIT LICENSE. Vite uses esbuild minification, and Three loaders use targeted imports to avoid bundling unrelated library modules.

## Provenance

The original template's [MIT LICENSE](LICENSE) remains unchanged. The personalized source is published at https://github.com/Akashsakhare123/akash-sakhare-portfolio and deployed at https://akash-sakhare-portfolio.vercel.app.

## Resume synchronization

The supplied PDF is served unchanged at `public/resume/Akash-Sakhare-Resume.pdf`. Profile, experience, education, skills, FlyHigh details and the local guide use its confirmed facts. The visible printed LinkedIn URL is used on the website because the original PDF contains an unrelated embedded LinkedIn target.
