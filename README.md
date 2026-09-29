# SoCal Robotics website

An Eleventy website adapted from HTML5 UP Spectral, with content in Markdown and a small, separate set of templates and styles.

**Status:** working first version for review. Not deployed. This source was prepared locally because the requested GitHub repository returned HTTP 403. No repository contents were available to inspect or merge. Import this into a branch of `SoCal-Robotics/website` after access is restored; preserve any existing files and repository instructions.

## Preview locally

Use Node 22 (see `.nvmrc`).

```sh
npm ci
npm run dev
```

Open http://localhost:8080. Stop with Ctrl+C.

```sh
npm test              # production build and internal link/content checks
npm run test:browser  # Chrome, keyboard, responsive, and automated accessibility checks
```

Browser tests use an installed Google Chrome. On CI, install it with `npx playwright install chrome` or configure a Playwright Chromium browser. No tests submit messages or payments.

## Where to work

| Task | File or directory |
| --- | --- |
| Edit page text, homepage cards or headings | `src/content/*.md` |
| Add or edit a student story | `src/content/stories/*.md` |
| Upload a photograph | `src/assets/images/` |
| Shared contact details, service URLs, navigation, updates copy | `src/_data/site.json` |
| Change layouts or reusable components | `src/_includes/` (developer) |
| Change appearance or menu behavior | `src/assets/css/`, `src/assets/js/` (developer) |

Start with [the editor guide](docs/EDITOR-GUIDE.md). See [launch steps](docs/LAUNCH.md), [content sources](docs/CONTENT-SOURCES.md), and [design credits](docs/DESIGN-CREDITS.md).

## Current service behavior

- Donate opens an inquiry to the Gmail address supplied in the APEX PDF. No payments are collected on this site. Set `donationUrl` to the exact Zeffy campaign URL when available. A future QR code should encode that same URL; keep a clickable link too.
- Get Updates leads to the shared footer section, with an email request while a signup service is pending. No automatic subscription or fake success message.
- Apply for Support explains the current inquiry process. Set `applicationUrl` only after rules and an application service are approved.
- Board names, financial reports, and unverified totals are not invented. The site explains where details are pending.
- All pages have `noindex, nofollow` while under review. Remove this in the base layout only as part of the approved launch.

## Netlify readiness

`netlify.toml` sets Node 22, the build/check command, `_site` output, and security headers. It does not deploy anything. There are no auto-deploy workflows or configured Netlify site IDs. See the launch guide before connecting a repository: connecting it to hosting may trigger a deployment.

## Accessibility

Semantic landmarks, a skip link, visible keyboard focus, no autoplay or required animation, reduced-motion support, readable contrast, image alternatives, and a progressive-enhancement mobile navigation. The mobile menu is a disclosure, not a modal; it does not trap focus. Automated WCAG checks and keyboard checks are included. These checks are not a certification of full WCAG 2.2 AA conformance; complete the manual checks in `docs/LAUNCH.md`.
