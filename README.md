# VelvetXR

VelvetXR is an English-language directory for comparing adult XR platforms across VR, AR, passthrough MR, WebXR, and supported devices.

The site is built with vinext and configured for Cloudflare Workers. The production domain is `https://www.velvetxr.com`.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

## Verification

```bash
npm run type
npm run lint
npm test
```

`npm test` builds the project and runs the rendered HTML checks in `tests/rendered-html.test.mjs`.

GitHub Actions runs the type check, lint, build, and rendered tests for pushes and pull requests targeting `main`.

## Cloudflare Workers

The repository includes `wrangler.jsonc` for the production Worker configuration. The Worker is named `velvet-xr` and intentionally does not contain a Cloudflare account ID, so the project can be connected to the current Cloudflare account at deployment time.

The application entry point is `vinext/server/app-router-entry`. Local Cloudflare bindings are simulated through `vite.config.ts`; no D1 or R2 binding is currently required by the site.

## Affiliate configuration

Affiliate destinations are supplied through environment variables and are never hard-coded as commission URLs. See `.env.example` for the supported variables.

If an affiliate variable is empty or invalid, the site falls back to the platform's standard HTTPS URL. Affiliate status is exposed to the UI so configured partners can be marked appropriately.

Do not commit `.env` files or affiliate credentials. `.env*` files are ignored except for `.env.example`.

## Public operator information

`.env.example` also documents the public operator fields that must be completed with verified information before public launch:

- `SITE_OPERATOR_NAME`
- `SITE_OPERATOR_ADDRESS`
- `SITE_OPERATOR_REGISTER`
- `SITE_OPERATOR_ORG_NUMBER`
- `SITE_OPERATOR_VAT`
- `CONTACT_EMAIL`

Do not invent operator details. The contact page is designed to avoid publishing unverified placeholder information.

## SEO and indexing

The production metadata uses `https://www.velvetxr.com` as the canonical site URL. Public crawling is enabled through `app/robots.ts`, and `app/sitemap.ts` publishes the public trust, guide, legal, and contact routes.

Private outbound redirect routes under `/go/*` remain `noindex` and `no-store`.

## Optional ChatGPT sign-in

The repository includes helpers in `app/chatgpt-auth.ts` for optional or required Sign in with ChatGPT flows where needed. Public directory content remains anonymous-compatible.

## Useful project areas

- `app/` — pages, ranking UI, platform data, affiliate handling, and legal/trust content
- `worker/` — Cloudflare Worker entry point
- `build/` — build-time helpers and Vite integration
- `tests/` — rendered HTML and behavior checks
- `wrangler.jsonc` — Cloudflare Worker deployment configuration
- `.env.example` — affiliate and operator configuration template
