import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", process.pid + "-" + Date.now() + "-" + Math.random());
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost" + pathname, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the English ranking content behind the session age overlay", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="en">/i);
  assert.match(
    html,
    /<title>Best VR Porn, AR &amp; Passthrough MR Sites \(2026\) \| VelvetXR<\/title>/i,
  );
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  assert.match(html, /The Best VR Porn, AR &amp; Passthrough MR Experiences/);
  assert.match(html, /SexLikeReal/);
  assert.match(html, /id="rankings"/);
  assert.match(html, /href="\/how-we-rank"/);
  assert.match(html, /href="\/affiliate-disclosure"/);
  assert.match(html, /Loading VelvetXR/);
  assert.match(html, /name="robots" content="index, follow"/i);
  assert.match(html, /property="og:image" content="https:\/\/www\.velvetxr\.com\/og\.png"/i);
  assert.doesNotMatch(html, /NÆRVÆR|Immersiv 18\+ teknologiguide/i);
});

test("server-renders every trust and guide route with unique English metadata", async () => {
  const routes = [
    ["/affiliate-disclosure", "Affiliate Disclosure | VelvetXR", "Affiliate disclosure"],
    ["/privacy", "Privacy | VelvetXR", "Privacy"],
    ["/terms", "Terms of Use | VelvetXR", "Terms of use"],
    ["/contact", "Contact and Site Information | VelvetXR", "Contact and site information"],
    ["/how-we-rank", "How VelvetXR Ranks Adult XR Platforms | VelvetXR", "How we rank adult XR platforms"],
    ["/guides/ar-vs-vr", "AR vs VR: Passthrough MR, VR180 and WebXR Explained | VelvetXR", "AR vs VR: what passthrough MR, VR180 and WebXR actually mean"],
  ];

  const seenTitles = new Set();
  for (const [pathname, expectedTitle, expectedHeading] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, /<html lang="en">/i);
    assert.ok(html.includes("<title>" + expectedTitle + "</title>"), pathname);
    assert.ok(html.includes("<h1>" + expectedHeading + "</h1>"), pathname);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, pathname);
    assert.match(html, /<main class="trust-main" id="trust-content">/);
    assert.match(html, /Skip to content/);
    assert.match(html, /name="robots" content="index, follow"/i);
    assert.doesNotMatch(html, /#hovedinnhold|#katalog|#teknologi|#metodikk/);
    assert.equal(seenTitles.has(expectedTitle), false, expectedTitle);
    seenTitles.add(expectedTitle);
  }
});

test("documents actual privacy, affiliate, and editorial behavior", async () => {
  const [privacy, affiliate, ranking, guide, contact] = await Promise.all([
    render("/privacy").then((response) => response.text()),
    render("/affiliate-disclosure").then((response) => response.text()),
    render("/how-we-rank").then((response) => response.text()),
    render("/guides/ar-vs-vr").then((response) => response.text()),
    render("/contact").then((response) => response.text()),
  ]);

  assert.match(privacy, /current browser session/);
  assert.match(privacy, /discreet mode/);
  assert.match(privacy, /favourites/);
  assert.match(privacy, /no advertising or behavioural analytics cookies/);
  assert.match(affiliate, /No commission-paying affiliate URLs are currently configured/);
  assert.match(affiliate, /do not determine rankings/);
  assert.match(ranking, /No current listing has reached E3 yet/);
  assert.match(guide, /C4 · Spatial AR/);
  assert.match(guide, /W3C WebXR Device API/);
  assert.doesNotMatch(contact, /href="mailto:/);
});

test("keeps filters, evidence, local preferences, and affiliate state consistent", async () => {
  const [client, data, layout, route, affiliateConfig, robots, envExample] =
    await Promise.all([
      readFile(new URL("../app/directory-client.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/platform-data.ts", import.meta.url), "utf8"),
      readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/go/[slug]/route.ts", import.meta.url), "utf8"),
      readFile(new URL("../app/affiliate-config.ts", import.meta.url), "utf8"),
      readFile(new URL("../app/robots.ts", import.meta.url), "utf8"),
      readFile(new URL("../.env.example", import.meta.url), "utf8"),
    ]);

  assert.match(client, /useState\("All devices"\)/);
  assert.match(client, /technology === "VR only \(no MR\)"/);
  assert.match(client, /platform\.category === "Player \/ tool"/);
  assert.match(client, /E3: "E3 · independently tested"/);
  assert.match(client, /sessionStorage\.setItem\("velvetxr-age-session"/);
  assert.match(client, /localStorage\.setItem\("velvetxr-favorites"/);
  assert.match(client, /kind: "source"/);
  assert.match(client, /outboundIsAffiliate/);
  assert.doesNotMatch(client, /id="hovedinnhold"|id="katalog"|id="teknologi"|id="metodikk"/);

  assert.match(data, /export type Evidence = "E1" \| "E2" \| "E3"/);
  assert.equal((data.match(/\brank: \d+,/g) ?? []).length, 15);
  assert.match(data, /devices: \["Meta Quest", "Vision Pro", "PCVR", "Mobile"\]/);
  assert.doesNotMatch(data, /Innholdsplattform|Avspiller \/ verktøy|Offisiell/);

  assert.match(layout, /<html lang="en">/);
  assert.match(layout, /summary_large_image/);
  assert.match(route, /"X-Robots-Tag": "noindex, nofollow, noarchive"/);
  assert.match(route, /"Cache-Control": "private, no-store"/);
  assert.match(affiliateConfig, /partnerUrl \?\? platform\.url/);
  assert.match(affiliateConfig, /activePlatformIds/);
  assert.match(robots, /allow: "\/"/);
  assert.match(robots, /https:\/\/www\.velvetxr\.com\/sitemap\.xml/);
  assert.match(envExample, /SITE_OPERATOR_NAME=/);
  assert.match(envExample, /CONTACT_EMAIL=/);
});

test("redirect routes remain temporary, private, and non-indexable", async () => {
  const known = await render("/go/sexlikereal");
  assert.equal(known.status, 302);
  assert.equal(known.headers.get("location"), "https://www.sexlikereal.com/");
  assert.equal(known.headers.get("cache-control"), "private, no-store");
  assert.equal(known.headers.get("x-robots-tag"), "noindex, nofollow, noarchive");

  const unknown = await render("/go/not-a-real-platform");
  assert.equal(unknown.status, 404);
  assert.equal(await unknown.text(), "Unknown platform");
  assert.equal(unknown.headers.get("cache-control"), "private, no-store");
});

test("ships a non-trivial project-local social card", async () => {
  const socialCard = await stat(new URL("../public/og.png", import.meta.url));
  assert.ok(socialCard.isFile());
  assert.ok(socialCard.size > 100_000);
});
