# VelvetXR launch checklist

## Completed in code

- [x] Domain configuration centralized and environment-driven
- [x] Public crawling enabled
- [x] Production sitemap added with configurable URLs
- [x] Worker named `velvet-xr`
- [x] Old Cloudflare `account_id` removed from `wrangler.jsonc`
- [x] Affiliate URLs are environment-driven and HTTPS-validated
- [x] `/go/*` redirect routes are private and non-indexable
- [x] Legal/trust routes are present in the sitemap
- [x] Favicon and social card are present
- [x] Rendered HTML tests cover ranking, trust pages, filters, evidence, favorites, affiliate state, redirects, and social card
- [x] GitHub Actions CI added for type checking, linting, build, and rendered tests
- [x] Tests verify domain configuration is centralized and configurable

## Required before public launch

### Domain and Deployment
- [ ] Choose deployment strategy:
  - **Option A (Recommended):** Use Cloudflare Workers `.workers.dev` subdomain for initial launch
  - **Option B:** Configure temporary custom domain (e.g., subdomain of existing domain)
- [ ] Set `SITE_URL` environment variable in deployment environment
- [ ] Set `SITE_NAME` environment variable (default: "VelvetXR")
- [ ] Deploy Worker to chosen temporary domain
- [ ] Confirm SSL is active (automatic with Cloudflare Workers)
- [ ] Verify the site functions correctly on temporary domain

### Content and Configuration
- [ ] Complete verified public operator details in the deployment environment
- [ ] Add only genuine affiliate URLs after the relevant affiliate programs are approved
- [ ] Run the production build and CI successfully
- [ ] Verify `/`, `/robots.txt`, `/sitemap.xml`, all public trust/guide routes, and `/go/*`
- [ ] Verify canonical URL and social preview metadata on the live domain
- [ ] Submit the sitemap to the relevant search engines after the site is live

### Future Migration to velvetxr.com
- [ ] Register `velvetxr.com` when available
- [ ] Add the domain to the current Cloudflare account
- [ ] Configure DNS to point to the existing Worker
- [ ] Update `SITE_URL` environment variable to `https://www.velvetxr.com`
- [ ] Test canonical URLs and metadata on new domain
- [ ] Configure redirects from temporary domain if needed
- [ ] Update sitemap in search engines

## Do not do

- Do not commit `.env` files or affiliate credentials.
- Do not invent operator details, registration numbers, contact information, affiliate relationships, or test evidence.
- Do not index `/go/*` redirect routes.
- Do not claim the site is live until the chosen domain responds successfully over HTTPS.
- Do not block development waiting for `velvetxr.com` - use temporary deployment strategy.
