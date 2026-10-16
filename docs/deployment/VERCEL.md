# Vercel deployment

Active application/root directory: akash-portfolio. The workspace root and archived Next.js application are not deployment roots.

Framework: Vite. Install: npm ci. Build: npm run build. Output: dist. Single-page rewrites allow direct project-case and /play links. Existing static files (PDF, WebGL models, fonts, icons and project images) are served as assets. No environment variables are required by the portfolio or local guide.

.vercelignore excludes local extraction tools, QA reports, tests, example environment files and the unused upstream API handler. Personal resume and contact information remain in the public site as requested. This deploy does not push to the original template owner's GitHub repository.

Production deployment: https://akash-sakhare-portfolio.vercel.app. The build completed successfully on 16 October 2026. Vercel SSO protection is currently enabled, so anonymous visitors are redirected to Vercel authentication until the project owner explicitly approves disabling that setting. A custom domain can be attached later; no domain was purchased and no DNS was modified during this deployment.

Configuration follows https://vercel.com/docs/frameworks/frontend/vite and https://vercel.com/docs/project-configuration/vercel-json.

Deployment complete: explicit Vite build/output settings, SPA rewrites, source-upload exclusions and template-license notice are active. The current release includes the corrected social hover, responsive hero titles, Instagram, resume PDF and resume-confirmed content.
