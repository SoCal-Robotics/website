# Editing the website

## A safe change with multiple editors

1. Open `src/content/` in GitHub and select the page you want to update.
2. Click the pencil to edit. Create a branch for the change rather than committing directly to the main branch.
3. Keep the block between the first two `---` lines. This is the page's front matter: title, summary, and display settings. Edit wording inside fields; preserve indentation and existing URL fields.
4. Write paragraphs below that block. Use `##` for sections, `###` for subsections, `**bold**` for emphasis, and `[link text](/programs/)` for a link. The template supplies the page's main heading; do not add a `#` heading.
5. Preview the Markdown, then open a pull request with a short explanation. GitHub's Markdown preview shows text formatting, not the final page design.
6. Have another editor review the facts and the local site preview before merging. Once hosting is intentionally connected, a merge may publish the change.

Do not change `permalink` casually: it is the public address. Section links are generated from headings (lowercase words joined by hyphens, punctuation removed). If you rename a heading, update any `sections` entry and incoming links. The link checker catches broken links.

## A new student or team story

Copy `docs/STORY-TEMPLATE.md` to `src/content/stories/your-story-name.md`. Use a lowercase filename with hyphens. Its address will be `/stories/your-story-name/`.

- Keep `draft: true` while writing. Draft stories are omitted from the built site and story cards.
- Give it a title, summary (`description`), photo path, useful `imageAlt`, category, caption, and source note.
- Add real, approved facts. Distinguish what the student achieved from what the organization funded.
- Upload an approved photo to `src/assets/images/`. Use a descriptive lowercase filename and a WebP or JPEG optimized to about 1000–1600 pixels wide. Avoid huge originals. The current cards expect square photographs.
- Confirm permission to publish student photos and identifying details with the organization before launch.
- When approved, set `draft: false`. The story appears automatically on Home and Programs. `order` controls its place; smaller numbers come first.

## Homepage and shared copy

Homepage headings, cards, descriptions, and buttons are fields in `src/content/index.md`. Keep the existing indentation. Put text containing a colon inside quotes.

The shared updates section and contact information live in `src/_data/site.json`. Preserve quotation marks, commas, and braces. Blank service URLs intentionally show email-based alternatives. A maintainer should enter the exact public Zeffy donation URL in `donationUrl`; `updatesUrl` is the hosted signup-page URL, not an arbitrary form-post endpoint.

## Before requesting review

Check spelling, links, photo descriptions, current dates, and factual sources. Preview at a narrow mobile width as well as desktop. Never publish example statistics, unapproved funding promises, personal student records, or payment information.

## Undoing a mistake

Keep changes small and descriptive. A maintainer can revert a pull request or restore the previous version using GitHub history. Ask for help rather than changing files in `_includes`, JavaScript, CSS, or site configuration.
