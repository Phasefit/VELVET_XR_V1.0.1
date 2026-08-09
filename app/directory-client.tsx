"use client";

import { useEffect, useState } from "react";
import { platforms, type Evidence, type Platform } from "./platform-data";

const deviceOptions = [
  "All devices",
  "Meta Quest",
  "Vision Pro",
  "PCVR",
  "PICO",
  "Galaxy XR",
  "Mobile",
];
const heroDeviceOptions = ["All devices", "Meta Quest", "Vision Pro", "PCVR", "PICO"];
const technologyOptions = [
  "All XR",
  "Passthrough MR",
  "WebXR",
  "VR180",
  "VR only (no MR)",
];

function evidenceLabel(evidence: Evidence) {
  const labels: Record<Evidence, string> = {
    E1: "E1 · vendor claim",
    E2: "E2 · provider-documented",
    E3: "E3 · independently tested",
  };
  return labels[evidence];
}

type OutboundSelection = {
  platform: Platform;
  kind: "platform" | "source";
};

type DirectoryClientProps = {
  affiliatePlatformIds?: string[];
};

export function DirectoryClient({
  affiliatePlatformIds = [],
}: DirectoryClientProps) {
  const [ready, setReady] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [discreet, setDiscreet] = useState(false);
  const [device, setDevice] = useState("All devices");
  const [technology, setTechnology] = useState("All XR");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [outbound, setOutbound] = useState<OutboundSelection | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const legacyDiscreet = localStorage.getItem("naervaer-discreet");
      const legacyFavorites = localStorage.getItem("naervaer-favorites");
      const savedDiscreet =
        localStorage.getItem("velvetxr-discreet") ?? legacyDiscreet;
      const savedFavorites =
        localStorage.getItem("velvetxr-favorites") ?? legacyFavorites ?? "[]";

      let parsedFavorites: string[] = [];
      try {
        const parsed = JSON.parse(savedFavorites);
        parsedFavorites = Array.isArray(parsed)
          ? parsed.filter((item): item is string => typeof item === "string")
          : [];
      } catch {
        parsedFavorites = [];
      }

      if (legacyDiscreet !== null && localStorage.getItem("velvetxr-discreet") === null) {
        localStorage.setItem("velvetxr-discreet", legacyDiscreet);
      }
      if (legacyFavorites !== null && localStorage.getItem("velvetxr-favorites") === null) {
        localStorage.setItem("velvetxr-favorites", legacyFavorites);
      }
      localStorage.removeItem("naervaer-age");
      localStorage.removeItem("naervaer-discreet");
      localStorage.removeItem("naervaer-favorites");

      setAgeConfirmed(
        sessionStorage.getItem("velvetxr-age-session") === "confirmed",
      );
      setDiscreet(savedDiscreet === "true");
      setFavorites(parsedFavorites);
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      !ready || !ageConfirmed || outbound || showCompare ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready, ageConfirmed, outbound, showCompare]);

  const displayName = (platform: Platform) =>
    discreet ? `Platform ${String(platform.rank).padStart(2, "0")}` : platform.name;

  const filtered = platforms.filter((platform) => {
    const deviceMatch =
      device === "All devices" || platform.devices.includes(device);
    const technologyMatch =
      technology === "All XR" ||
      (technology === "VR only (no MR)"
        ? platform.xrClass === "C2"
        : platform.technologies.includes(technology));
    const haystack = [
      platform.name,
      platform.summary,
      platform.status,
      ...platform.technologies,
      ...platform.devices,
    ]
      .join(" ")
      .toLowerCase();
    return deviceMatch && technologyMatch && haystack.includes(query.toLowerCase());
  });

  const ranked = [...filtered].sort((a, b) => a.rank - b.rank);
  const comparedPlatforms = compare
    .map((id) => platforms.find((platform) => platform.id === id))
    .filter((platform): platform is Platform => Boolean(platform));
  const outboundPlatform = outbound?.platform ?? null;
  const outboundIsAffiliate = Boolean(
    outbound?.kind === "platform" &&
      outboundPlatform &&
      affiliatePlatformIds.includes(outboundPlatform.id),
  );

  function confirmAge() {
    sessionStorage.setItem("velvetxr-age-session", "confirmed");
    setAgeConfirmed(true);
  }

  function toggleDiscreet() {
    const next = !discreet;
    localStorage.setItem("velvetxr-discreet", String(next));
    setDiscreet(next);
  }

  function toggleFavorite(id: string) {
    const next = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];
    localStorage.setItem("velvetxr-favorites", JSON.stringify(next));
    setFavorites(next);
  }

  function toggleCompare(id: string) {
    if (compare.includes(id)) {
      setCompare(compare.filter((item) => item !== id));
      return;
    }
    if (compare.length < 3) setCompare([...compare, id]);
  }

  function scrollToCatalog() {
    document.getElementById("rankings")?.scrollIntoView({ behavior: "smooth" });
  }

  const platformCount = platforms.length;

  const passthroughCount = platforms.filter(
    (platform) => platform.xrClass === "C3"
  ).length;
  
  const independentlyTestedCount = platforms.filter(
    (platform) => platform.evidence === "E3"
  ).length;

  return (
    <>
      {!ready && (
        <div className="boot-screen gate-overlay" aria-label="Loading VelvetXR">
          <span className="brand-mark" aria-hidden="true">V</span>
          <span>Loading the XR guide …</span>
        </div>
      )}

      {ready && !ageConfirmed && (
        <div className="age-gate gate-overlay">
          <div className="age-orbit age-orbit-one" />
          <div className="age-orbit age-orbit-two" />
          <section className="age-card" role="dialog" aria-modal="true" aria-labelledby="age-title">
            <div className="age-topline">
              <span className="brand-mark">V</span>
              <span>VELVETXR</span>
            </div>
            <span className="eyebrow">18+ · independent XR guide</span>
            <h2 id="age-title">Before you continue</h2>
            <p>
              This site reviews platforms that feature adult content. You must
              be at least 18 and meet any higher legal-age requirement that
              applies where you live.
            </p>
            <div className="age-actions">
              <button className="button primary" onClick={confirmAge}>
                I meet the age requirement
              </button>
              <a className="button secondary" href="https://www.google.com/">
                Exit
              </a>
            </div>
            <p className="age-note">
              We do not ask for your date of birth. Confirmation lasts for this
              browser session and is not an independent age-verification check.
            </p>
            <nav className="age-policy-links" aria-label="Site policies">
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
              <a href="/affiliate-disclosure">Affiliate disclosure</a>
              <a href="/contact">Contact</a>
            </nav>
          </section>
        </div>
      )}

      <div
        className={`site-shell ${discreet ? "is-discreet" : ""}`}
        aria-hidden={!ready || !ageConfirmed ? true : undefined}
      >
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="topbar">
        <div className="top-note">
          15 adult XR platforms reviewed for 2026 · Ranked by passthrough, device support and documentation
        </div>
        <div className="header-main">
          <a className="brand" href="#top" aria-label="VelvetXR home">
            <span className="brand-mark">V</span>
            <span className="brand-copy">
              <strong>{discreet ? "XR GUIDE" : "VELVETXR"}</strong>
              <small>{discreet ? "immersive directory" : "independent 18+ guide"}</small>
            </span>
          </a>
          <label className="header-search">
            <span className="sr-only">Search XR platforms</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search 15 XR platforms …"
            />
            <span aria-hidden="true">⌕</span>
          </label>
          <div className="partner-teaser">
            <span aria-hidden="true">%</span>
            <p><strong>Commission links disclosed</strong><small>Adult destinations are identified before opening</small></p>
          </div>
          <button
            className={`discreet-toggle ${discreet ? "active" : ""}`}
            type="button"
            onClick={toggleDiscreet}
            aria-pressed={discreet}
          >
            <span aria-hidden="true">◐</span>
            <span>{discreet ? "Show names" : "Discreet"}</span>
          </button>
        </div>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#rankings">Top picks</a>
          <a href="/guides/ar-vs-vr">AR vs. VR</a>
          <a href="/how-we-rank">How we rank</a>
          <a href="/affiliate-disclosure">Affiliate disclosure</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="aurora aurora-one" />
          <div className="aurora aurora-two" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <div className="hero-kicker">
              <span className="live-dot" />
              Reviewed 9 August 2026
            </div>
            <h1>
              The Best VR Porn, AR &amp; Passthrough MR Experiences, <em>Ranked.</em>
            </h1>
            <p className="hero-lead">
              Compare leading immersive adult platforms for VR180, 360°,
              passthrough MR and WebXR—classified by what they document, not
              just the language used in their marketing.
            </p>
            <div className="hero-actions">
              <button className="button primary" onClick={scrollToCatalog}>
                Explore the rankings <span aria-hidden="true">↓</span>
              </button>
              <a className="button secondary" href="/how-we-rank">
                How we rank
              </a>
            </div>
            <div className="trust-line" aria-label="Privacy and content choices">
              <span>No autoplay</span>
              <span>No explicit previews</span>
              <span>Adult destination links disclosed</span>
            </div>
          </div>

          <aside className="device-panel" aria-label="Choose your device">
            <span className="panel-label">Start with your hardware</span>
            <h2>What do you use?</h2>
            <div className="device-list">
              {heroDeviceOptions.map((option, index) => (
                <button
                  key={option}
                  type="button"
                  className={device === option ? "selected" : ""}
                  onClick={() => setDevice(option)}
                >
                  <span className="device-icon" aria-hidden="true">
                    {index === 0 ? "◎" : index === 1 ? "◒" : index === 2 ? "◈" : index === 3 ? "▱" : "◉"}
                  </span>
                  <span>{option}</span>
                  <span className="device-arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
            <p>
              Your choice filters by claimed compatibility. It does not
              guarantee that an external service supports AR in your exact
              browser version.
            </p>
          </aside>

          <div className="hero-stats">
            <div>
              <strong>{platformCount}</strong>
              <span>platforms reviewed</span>
            </div>
            <div>
              <strong>{passthroughCount}</strong>
              <span>with documented passthrough</span>
            </div>
            <div>
              <strong>{independentlyTestedCount}</strong>
              <span>independently tested on-device</span>
            </div>
          </div>
        </section>

        <section className="section catalog-section" id="rankings">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow">Curated picks</span>
              <h2>Best for {device === "All devices" ? "immersive XR" : device}</h2>
            </div>
            <p>
              Ranked by documented XR relevance. The score is an editorial
              guide score, not a user rating.
            </p>
          </div>

          <div className="catalog-layout">
            <aside className="category-rail" aria-label="Directory filters">
              <div className="rail-heading">
                <span className="rail-avatar" aria-hidden="true">XR</span>
                <div><strong>XR categories</strong><small>Choose a quick view</small></div>
              </div>
              <div className="rail-list">
                <button
                  type="button"
                  className={device === "All devices" && technology === "All XR" ? "active" : ""}
                  onClick={() => {
                    setDevice("All devices"); 
                    setTechnology("All XR"); 
                    setQuery(""); }}
                >
                  <span aria-hidden="true">🏆</span><strong>All top picks</strong><small>{platforms.length}</small>
                </button>
                <button
                  type="button"
                  className={technology === "Passthrough MR" ? "active" : ""}
                  onClick={() => {
                    setTechnology("Passthrough MR");
                    setDevice("All devices"); }}
                >
                  <span aria-hidden="true">◉</span><strong>Passthrough / MR</strong><small>{platforms.filter((item) => item.xrClass === "C3").length}</small>
                </button>
                <button
                  type="button"
                  className={device === "Meta Quest" ? "active" : ""}
                  onClick={() => {
                    setDevice("Meta Quest"); 
                    setTechnology("All XR"); }}
                >
                  <span aria-hidden="true">◒</span><strong>Meta Quest</strong><small>{platforms.filter((item) => item.devices.includes("Meta Quest")).length}</small>
                </button>
                <button
                  type="button"
                  className={device === "Vision Pro" ? "active" : ""}
                  onClick={() => {
                    setDevice("Vision Pro"); 
                    setTechnology("All XR"); }}
                >
                  <span aria-hidden="true">◈</span><strong>Vision Pro</strong><small>{platforms.filter((item) => item.devices.includes("Vision Pro")).length}</small>
                </button>
                <button
                  type="button"
                  className={device === "PCVR" ? "active" : ""}
                  onClick={() => {
                    setDevice("PCVR");
                    setTechnology("All XR"); }}
                >
                  <span aria-hidden="true">▱</span><strong>PCVR</strong><small>{platforms.filter((item) => item.devices.includes("PCVR")).length}</small>
                </button>
                <button
                  type="button"
                  className={technology === "WebXR" ? "active" : ""}
                  onClick={() => {
                    setTechnology("WebXR");
                    setDevice("All devices"); }}
                >
                  <span aria-hidden="true">⌁</span><strong>WebXR</strong><small>{platforms.filter((item) => item.technologies.includes("WebXR")).length}</small>
                </button>
                <button
                  type="button"
                  className={technology === "VR only (no MR)" ? "active" : ""}
                  onClick={() => {
                    setTechnology("VR only (no MR)");
                    setDevice("All devices"); }}
                >
                  <span aria-hidden="true">◎</span><strong>VR only (no MR)</strong><small>{platforms.filter((item) => item.xrClass === "C2").length}</small>
                </button>
              </div>
              <a className="rail-deal" href="/affiliate-disclosure">
                <span className="deal-badge">%</span>
                <strong>How this guide earns money</strong>
                <small>Read our affiliate disclosure</small>
                <span aria-hidden="true">→</span>
              </a>
              <div className="rail-trust">
                <strong>18+ and external sites</strong>
                <p>We show no explicit previews and identify external 18+ destinations before opening them.</p>
              </div>
            </aside>

            <div className="catalog-main">
              <div className="filter-surface">
                <label className="search-field">
                  <span className="sr-only">Search the directory</span>
                  <span aria-hidden="true">⌕</span>
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by platform or technology"
                  />
                </label>
                <label className="select-field">
                  <span>Device</span>
                  <select value={device} onChange={(event) => setDevice(event.target.value)}>
                    {deviceOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label className="select-field">
                  <span>Technology</span>
                  <select
                    value={technology}
                    onChange={(event) => setTechnology(event.target.value)}
                  >
                    {technologyOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <div className="result-count" aria-live="polite">
                  <strong>{filtered.length}</strong>
                  <span>matches</span>
                </div>
              </div>

              <div className="directory-heading">
                <h3>Ranked directory</h3>
                <span>{filtered.length} of {platforms.length} listings</span>
              </div>

                {ranked.length > 0 && (
                <div className="featured-grid">
                    {ranked.map((platform) => (
                    <article className={`feature-card accent-${platform.accent}`} key={platform.id}>
                      <div className="site-preview">
                        <div className="preview-browser">
                          <i /><i /><i />
                          <span>{platform.category === "Player / tool" ? "XR PLAYER" : "SECURE 18+ XR"}</span>
                        </div>
                        <div className="preview-canvas">
                          <span className="preview-logo" aria-hidden="true">
                            {discreet ? platform.rank : platform.name.charAt(0)}
                          </span>
                          <strong>{displayName(platform)}</strong>
                          <small>{platform.status}</small>
                          <div className="preview-panels" aria-hidden="true"><i /><i /><i /></div>
                          <span className="preview-score">XR {platform.score}</span>
                        </div>
                        <div className="preview-caption">
                          <b>{platform.rank}</b>
                          <strong>{displayName(platform)}</strong>
                          <span>{platform.category === "Player / tool" ? "TOOL" : "18+"}</span>
                        </div>
                        <button
                          className={`icon-button ${favorites.includes(platform.id) ? "active" : ""}`}
                          type="button"
                          onClick={() => toggleFavorite(platform.id)}
                          aria-label={`${favorites.includes(platform.id) ? "Remove" : "Add"} ${displayName(platform)} ${favorites.includes(platform.id) ? "from" : "to"} favorites`}
                        >
                          {favorites.includes(platform.id) ? "◆" : "◇"}
                        </button>
                      </div>

                      <div className="review-status">
                        <span className={platform.xrClass === "C3" ? "mr-text" : "vr-text"}>{platform.status}</span>
                        <strong>{evidenceLabel(platform.evidence)}</strong>
                      </div>
                      <p className="platform-summary">{platform.summary}</p>
                      <div className="review-benefits">
                        <span>
                          <b>Technology</b>
                          {platform.technologies.join(" · ")}
                        </span>
                        <span>
                          <b>Devices</b>
                          {platform.devices.join(" · ")}
                        </span>
                        <span>
                          <b>Model</b>
                          {platform.model}
                        </span>
                      </div>
                      <div className="card-actions">
                        <button
                          className="text-button"
                          type="button"
                          onClick={() => setExpanded(expanded === platform.id ? null : platform.id)}
                          aria-expanded={expanded === platform.id}
                        >
                          {expanded === platform.id ? "Hide evidence" : "View evidence"}
                        </button>
                        <button
                          className="visit-button"
                          type="button"
                          onClick={() => setOutbound({ platform, kind: "platform" })}
                        >
                          Visit site <span aria-hidden="true">↗</span>
                        </button>
                      </div>
                      {expanded === platform.id && (
                        <div className="detail-panel">
                          <dl>
                            <div><dt>XR class</dt><dd>{platform.xrClass}</dd></div>
                            <div><dt>Evidence level</dt><dd>{evidenceLabel(platform.evidence)}</dd></div>
                            <div><dt>Access</dt><dd>{platform.access}</dd></div>
                          </dl>
                          <p><strong>Limitation:</strong> {platform.limitation}</p>
                          <button
                            className="source-button"
                            type="button"
                            onClick={() => setOutbound({ platform, kind: "source" })}
                          >
                            {platform.sourceLabel} ↗
                          </button>
                        </div>
                      )}
                      <label className="compare-check">
                        <input
                          type="checkbox"
                          checked={compare.includes(platform.id)}
                          onChange={() => toggleCompare(platform.id)}
                          disabled={!compare.includes(platform.id) && compare.length >= 3}
                        />
                        <span>Compare</span>
                      </label>
                    </article>
                  ))}
                </div>
              )}

              {filtered.length === 0 && (
                <div className="empty-state">
                  <span aria-hidden="true">◎</span>
                  <h3>No documented matches</h3>
                  <p>Try another device or a broader technology filter.</p>
                  <button
                    className="button secondary"
                    type="button"
                    onClick={() => {
                      setDevice("All devices");
                      setTechnology("All XR");
                      setQuery("");
                    }}
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="section tech-section" id="technology">
          <div className="section-heading centered-heading">
            <span className="eyebrow">Terminology matters</span>
            <h2>AR, MR and VR are not the same.</h2>
            <p>
              We use a non-compensatory XR classification. High image quality
              can never turn standard VR180 into AR.
            </p>
          </div>
          <div className="tech-grid">
            <article>
              <span className="class-code c4">C4</span>
              <h3>Spatially anchored AR</h3>
              <p>
                The physical room remains visible while digital content keeps a
                stable position through anchoring or spatial understanding.
              </p>
              <strong>No listing independently tested on-device</strong>
            </article>
            <article>
              <span className="class-code c3">C3</span>
              <h3>Passthrough MR</h3>
              <p>
                The headset cameras show your room while virtual content is
                overlaid. Stable spatial anchoring is not necessarily confirmed.
              </p>
              <strong>9 documented + 1 limited</strong>
            </article>
            <article>
              <span className="class-code c2">C2</span>
              <h3>Immersive VR</h3>
              <p>
                VR180 or 360° content responds to head rotation, but the
                physical world is not normally visible.
              </p>
              <strong>5 listings</strong>
            </article>
            <article>
              <span className="class-code c1">C1</span>
              <h3>Spatial / stereoscopic</h3>
              <p>
                A separate image for each eye creates depth. That is 3D, but it
                is not automatically immersive VR or AR.
              </p>
              <strong>A format, not proof of AR</strong>
            </article>
          </div>
          <div className="tech-callout">
            <span aria-hidden="true">i</span>
            <p>
              <strong>WebXR is an API standard, not proof of AR.</strong> A site
              can use WebXR for either VR or AR, so VelvetXR requires separate
              evidence before assigning an MR label.
            </p>
            <a className="section-detail-link" href="/guides/ar-vs-vr">
              Read the full AR vs. VR guide <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section className="section method-section" id="methodology">
          <div className="method-card">
            <div className="method-intro">
              <span className="eyebrow">How we rank</span>
              <h2>XR relevance, clearly explained.</h2>
              <p>
                The score measures how useful a platform is to an XR user. It
                does not rate editorial content and is not based on anonymous
                star ratings.
              </p>
            </div>
            <div className="weight-list">
              {[
                ["Technology class", 40],
                ["Device coverage", 30],
                ["Access and playback", 20],
                ["Documentation", 10],
              ].map(([label, weight]) => (
                <div className="weight-row" key={String(label)}>
                  <div><span>{label}</span><strong>{weight}%</strong></div>
                  <span className="weight-track"><i style={{ width: `${weight}%` }} /></span>
                </div>
              ))}
            </div>
            <div className="evidence-grid">
              <div><strong>E1</strong><span>The vendor uses XR, AR or MR language without enough technical detail.</span></div>
              <div><strong>E2</strong><span>A current official provider page documents the format, passthrough or a named feature.</span></div>
              <div><strong>E3</strong><span>VelvetXR has tested a named headset, OS and browser. No listing has reached this level yet.</span></div>
            </div>
            <a className="section-detail-link" href="/how-we-rank">
              Read the full methodology <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <section className="section privacy-strip" id="affiliate">
          <div>
            <span className="eyebrow">Affiliate disclosure</span>
            <h2>Affiliate revenue, with no influence on rankings.</h2>
          </div>
          <div className="affiliate-copy">
            <p>
              Outbound buttons use a single redirect route. When an active
              affiliate link is configured, VelvetXR may earn a commission from
              a qualifying purchase. When no affiliate link is configured, the
              platform&apos;s standard official URL is used.
            </p>
            <ul>
              <li>VelvetXR does not set the destination platform&apos;s price.</li>
              <li>Affiliate status does not affect XR score or placement.</li>
              <li>You are always notified before an external 18+ site opens.</li>
            </ul>
            <a className="section-detail-link" href="/affiliate-disclosure">
              Read the full affiliate disclosure <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <span className="brand-mark">V</span>
          <div><strong>VELVETXR</strong><span>Independent guide to immersive adult XR</span></div>
        </div>
        <p>
          18+ · No autoplay · No explicit previews · No paid ranking placements
        </p>
        <div className="footer-links">
          <a href="/guides/ar-vs-vr">AR vs. VR</a>
          <a href="/how-we-rank">Methodology</a>
          <a href="/affiliate-disclosure">Affiliate</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/contact">Contact</a>
          <button type="button" onClick={() => {
            sessionStorage.removeItem("velvetxr-age-session");
            localStorage.removeItem("velvetxr-discreet");
            localStorage.removeItem("velvetxr-favorites");
            setDiscreet(false);
            setFavorites([]);
            setAgeConfirmed(false);
          }}>Reset local preferences</button>
        </div>
      </footer>

      {compare.length > 0 && (
        <div className="compare-dock" role="region" aria-label="Selected platforms">
          <div>
            <span className="compare-count">{compare.length}/3</span>
            <p><strong>Comparison</strong><span>{comparedPlatforms.map(displayName).join(" · ")}</span></p>
          </div>
          <button className="button primary" type="button" onClick={() => setShowCompare(true)}>
            Compare now
          </button>
          <button className="dock-close" type="button" onClick={() => setCompare([])} aria-label="Clear comparison">×</button>
        </div>
      )}

      {showCompare && (
        <div className="modal-backdrop">
          <button
            className="modal-backdrop-dismiss"
            type="button"
            aria-label="Close comparison"
            onClick={() => setShowCompare(false)}
          />
          <section
            className="compare-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="compare-title"
          >
            <div className="modal-heading">
              <div><span className="eyebrow">Side by side</span><h2 id="compare-title">Compare XR features</h2></div>
              <button className="modal-close" type="button" onClick={() => setShowCompare(false)} aria-label="Close comparison">×</button>
            </div>
            <div className="compare-grid">
              {comparedPlatforms.map((platform) => (
                <article key={platform.id}>
                  <span className="platform-monogram">{discreet ? platform.rank : platform.name.charAt(0)}</span>
                  <h3>{displayName(platform)}</h3>
                  <dl>
                    <div><dt>XR-score</dt><dd>{platform.score}</dd></div>
                    <div><dt>Class</dt><dd>{platform.xrClass}</dd></div>
                    <div><dt>Evidence</dt><dd>{platform.evidence}</dd></div>
                    <div><dt>Technology</dt><dd>{platform.technologies.join(", ")}</dd></div>
                    <div><dt>Devices</dt><dd>{platform.devices.join(", ")}</dd></div>
                    <div><dt>Access</dt><dd>{platform.access}</dd></div>
                    <div><dt>Pricing</dt><dd>{platform.model}</dd></div>
                  </dl>
                  <button className="visit-button" type="button" onClick={() => { setShowCompare(false); setOutbound({ platform, kind: "platform" }); }}>
                    Visit platform <span aria-hidden="true">↗</span>
                  </button>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

      {outbound && outboundPlatform && (
        <div className="modal-backdrop">
          <button
            className="modal-backdrop-dismiss"
            type="button"
            aria-label="Close external-link notice"
            onClick={() => setOutbound(null)}
          />
          <section
            className="outbound-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="outbound-title"
          >
            <button className="modal-close" type="button" onClick={() => setOutbound(null)} aria-label="Close">×</button>
            <span className="outbound-icon" aria-hidden="true">↗</span>
            <span className="eyebrow">
              {outbound.kind === "source" ? "External evidence source" : "External 18+ platform"}
            </span>
            <h2 id="outbound-title">You are now leaving VelvetXR</h2>
            <p>
              You are about to visit {displayName(outboundPlatform)}.
              {outbound.kind === "source"
                ? " This opens the provider page used as evidence for the listing."
                : " This platform has its own terms, payment methods, and privacy policy."}
            </p>
            <div className="outbound-facts">
              <span>{outboundPlatform.status}</span>
              <span>{evidenceLabel(outboundPlatform.evidence)}</span>
            </div>
            <p className="referral-disclosure">
              {outbound.kind === "source" ? (
                <>
                  <strong>Evidence link:</strong> This is a standard external
                  source link and does not use VelvetXR&apos;s affiliate route.
                </>
              ) : outboundIsAffiliate ? (
                <>
                  <strong>Paid link:</strong> VelvetXR may receive a commission
                  if you make a qualifying purchase after following this link.
                </>
              ) : (
                <>
                  <strong>Standard external link:</strong> No commission-paying
                  affiliate URL is currently configured for this destination.
                </>
              )}
            </p>
            <div className="modal-actions">
              <button className="button secondary" type="button" onClick={() => setOutbound(null)}>Stay here</button>
              <a
                className="button primary"
                href={
                  outbound.kind === "source"
                    ? outboundPlatform.sourceUrl
                    : `/go/${outboundPlatform.id}`
                }
                target="_blank"
                rel={
                  outboundIsAffiliate
                    ? "sponsored noopener noreferrer"
                    : "noopener noreferrer"
                }
              >
                {outbound.kind === "source" ? "Open official source ↗" : "Continue to platform ↗"}
              </a>
            </div>
          </section>
        </div>
      )}
      </div>
    </>
  );
}
