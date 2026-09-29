# Launch checklist — deployment requires owner approval

This project has not been deployed. Do not change DNS or connect live publishing until the owner explicitly approves.

## Complete the first version

- Restore GitHub access to `SoCal-Robotics/website`, inspect its existing files and instructions, and integrate on a review branch. Do not replace an unseen repository wholesale.
- Review all copy, especially the board/leadership and financial-transparency sections. Supply approved profiles and available documents.
- Confirm the legal identity, EIN and charitable-status wording against organization records. The initial source is the supplied APEX handout, not an independent legal verification.
- Confirm permission to publish the supplied APEX photos and story.
- Provide the exact Zeffy campaign URL, set `donationUrl`, and test the destination. If desired, add a QR code for the same campaign with descriptive text and the clickable link. Do not point donors to Zeffy's general homepage.
- Choose and configure the email-signup service, set `updatesUrl`, and update the privacy notice to reflect actual providers, retention, consent, and unsubscribe behavior. Until then the site uses email inquiries.
- Finalize eligibility, deadlines, funding limits, and review procedures before replacing the support-inquiry flow with a formal application.

## Technical review

- Run `npm ci`, `npm test`, and `npm run test:browser` using Node 22 and Chrome.
- Inspect desktop, 390px and 320px layouts; also verify zoom/reflow at 200% and 400%, landscape mobile, keyboard focus at sticky headers, and VoiceOver or another screen reader.
- Check skip link, menu open/close, Escape, current-page announcements, content headings, meaningful image alternatives, and all calls to action.
- The automated axe suite targets WCAG 2.2 AA criteria it can check. It cannot establish full conformance by itself.
- Verify donation/signup/application destinations and their accessibility separately when connected.
- Confirm all story drafts stay unpublished and all links pass.

## After explicit approval to deploy

1. Connect the correct GitHub branch to Netlify. Creating the Netlify site may trigger a first deploy.
2. Use the checked-in `netlify.toml`: Node 22; command `npm run build && npm run check`; publish `_site`.
3. Review Netlify's temporary URL before changing DNS. Verify security headers, 404 responses, images, mail links, external destinations, and navigation.
4. For the approved public launch, remove the review-only robots meta directive from `src/_includes/layouts/base.njk`. Add the confirmed canonical domain, canonical URLs, sitemap, and social-share URL metadata at that point.
5. Domain connection and DNS changes require their own explicit authorization. Preserve existing email DNS records.
6. Agree on branch protection and the editorial review workflow before enabling automatic publication of routine edits. Netlify deploy previews also publish content and should only be enabled intentionally.
