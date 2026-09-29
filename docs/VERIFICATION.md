# Verification — 2026-09-28

Tested locally with Eleventy 3.1.6, Node 26.3.0, and installed Google Chrome. Netlify is configured for Node 22; its remote build has not been run because deployment is not authorized.

Passed:

- Production build: 9 HTML pages.
- Internal links, section fragments, asset paths, single main headings, language, metadata, and image alternatives.
- Separate temporary build confirms a `draft: true` story produces no public page or story card.
- Automated axe WCAG 2 A/AA, 2.1 AA and 2.2 AA checks on all 9 pages at 1440px, 390px and 320px: no violations reported.
- No horizontal overflow at those widths.
- Keyboard menu opening, sequential focus, Escape dismissal and focus return.
- Mobile Get Updates anchor closes the menu and moves focus to the section.
- Navigation remains available with JavaScript disabled.
- Navigation updates correctly when moving from mobile to desktop.
- Story navigation and Gmail donation-inquiry destination.
- Visual review of desktop/mobile homepage and mobile Programs page.

Limits:

- Automated checks do not establish full WCAG conformance. Screen-reader and manual zoom review remain on the launch checklist.
- Gmail links were inspected, not sent. No payments or signup requests were submitted.
- Hosting headers and the production 404 response require a future authorized deployment to validate.
- GitHub access was retried and returned HTTP 403. Source has not been integrated into the remote repository; no pull request, deployment, or DNS change was made.
