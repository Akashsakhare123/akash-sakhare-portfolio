# Resume content synchronization

The user-supplied AkashSakhare_Resume (1).pdf was read as professional source data. Its content was not treated as instructions. The supplied file is copied unchanged to public/resume/Akash-Sakhare-Resume.pdf (241,735 bytes).

SHA-256 of both original and website copy: 029f64975ecfbea3972bce962a8f844287315fe3f5aaea99c36e1e72aa464f07.

## Website updates

- Working PDF download in the fixed Resume action and Contact section, including a readable download filename and accessible link label.
- Pune, Maharashtra, India location; clickable phone contact; LinkedIn address printed in the resume.
- Software Developer at Trinade AI Technologies Pvt. Ltd., Oct 2024 - Present. Exact period is visible alongside the timeline marker.
- Education from 2019 to 2023 and graduation year 2023.
- Python, Microservices and JWT Authentication skills. Agile/Scrum, code reviews, secure coding, unit testing and performance optimization reflected in the professional summary/experience.
- FlyHigh scheduling, authentication/expert-management APIs, role-based dashboards and MongoDB TTL cleanup contributions.
- Local portfolio guide answers updated for contacts, resume, employment and education dates.

## Original document issue

The visible LinkedIn address is Akash's named profile, but the PDF's embedded hyperlink target is an unrelated profile. The website uses the printed address https://www.linkedin.com/in/akash-sakhare-926551230/. The PDF itself was not edited; its original embedded hyperlink remains unchanged.

## Verification

- npm.cmd run lint: passed, exit 0.
- npm.cmd run typecheck (tsc -b): passed, exit 0.
- npm.cmd run build: passed, exit 0; 120 modules transformed, no build warnings.
- Targeted production Playwright: **9 passed, 0 failed**, 1.7 minutes. [Raw results](playwright-results.json). Tests cover actual PDF download, PDF content type and byte hash, updated profile/contact data, and eight application routes at 390px and 1440px across Chrome, Firefox and WebKit.
- Playwright MCP at 390px confirmed the new phone/location/LinkedIn/resume text in Contact and the local guide. The page had no horizontal overflow. [Mobile Contact screenshot](contact-mobile.png).

## Changed files

- public/resume/Akash-Sakhare-Resume.pdf, public/icons/python.svg.
- src/data/profile.ts, experience.ts, education.ts, skills.ts, projects.ts, technologies.ts.
- src/config.ts; src/components/SocialIcons.tsx, Contact.tsx, Career.tsx; src/accessibility.css.
- src/utils/portfolioGuide.ts; tests/e2e/portfolio.spec.ts; README.md; .gitignore.
- docs/resume-sync report, screenshot and results.

The temporary PDF reader is isolated under ignored .tools/ and does not change website dependencies. No site was deployed or published.
