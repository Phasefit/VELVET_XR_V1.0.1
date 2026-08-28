# VelvetXR launch checklist

## Completed in code

- [x] Production site URL set to `https://www.velvetxr.com`
- [x] Public crawling enabled
- [x] Production sitemap added
- [x] Worker named `velvet-xr`
- [x] Old Cloudflare `account_id` removed from `wrangler.jsonc`
- [x] Affiliate URLs are environment-driven and HTTPS-validated
- [x] `/go/*` redirect routes are private and non-indexable
- [x] Legal/trust routes are present in the sitemap
- [x] Favicon and social card are present
- [x] Rendered HTML tests cover ranking, trust pages, filters, evidence, favorites, affiliate state, redirects, and social card
- [x] GitHub Actions CI added for type checking, linting, build, and rendered tests

## Required before public launch

- [ ] Register `velvetxr.com`
- [ ] Add the registered domain to the current Cloudflare account
- [ ] Connect `www.velvetxr.com` to the `velvet-xr` Worker
- [ ] Confirm SSL is active
- [ ] Complete verified public operator details in the deployment environment
- [ ] Add only genuine affiliate URLs after the relevant affiliate programs are approved
- [ ] Run the production build and CI successfully
- [ ] Verify `/`, `/robots.txt`, `/sitemap.xml`, all public trust/guide routes, and `/go/*`
- [ ] Verify canonical URL and social preview metadata on the live domain
- [ ] Submit the sitemap to the relevant search engines after the domain is live

## Do not do

- Do not commit `.env` files or affiliate credentials.
- Do not invent operator details, registration numbers, contact information, affiliate relationships, or test evidence.
- Do not index `/go/*` redirect routes.
- Do not claim the site is live until the custom domain responds successfully over HTTPS.
