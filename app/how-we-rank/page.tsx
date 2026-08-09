import type { Metadata } from "next";
import { TrustPage, TrustSection } from "../trust-page";

export const metadata: Metadata = {
  title: "How VelvetXR Ranks Adult XR Platforms",
  description:
    "VelvetXR's scoring methodology for VR porn, passthrough MR, WebXR, device support, and evidence quality.",
};

export default function HowWeRankPage() {
  return (
    <TrustPage
      eyebrow="Editorial methodology"
      title="How we rank adult XR platforms"
      summary="The VelvetXR score measures documented XR usefulness—not popularity, anonymous star ratings, or the size of an affiliate commission."
      currentPath="/how-we-rank"
    >
      <TrustSection id="score" title="The 100-point framework">
        <div className="table-scroll">
          <table className="method-table">
            <thead>
              <tr><th>Dimension</th><th>Weight</th><th>What it measures</th></tr>
            </thead>
            <tbody>
              <tr><th>Technology class</th><td>40%</td><td>How immersive the documented implementation is, from spatially anchored AR to conventional stereoscopic formats.</td></tr>
              <tr><th>Device coverage</th><td>30%</td><td>Named support for current headsets, browsers, players, and practical access paths.</td></tr>
              <tr><th>Access and playback</th><td>20%</td><td>How clearly users can stream, download, or launch the experience on supported hardware.</td></tr>
              <tr><th>Documentation</th><td>10%</td><td>The quality, specificity, and currency of the evidence supporting each technical claim.</td></tr>
            </tbody>
          </table>
        </div>
      </TrustSection>

      <TrustSection id="selection" title="Inclusion and exclusion">
        <p>
          A directory entry must have a current official destination, a genuine
          XR use case, and enough public information to classify its format or
          access path. A content platform and an XR player can both qualify, but
          their category is shown so users do not mistake a playback tool for a
          content producer.
        </p>
        <p>
          A dormant destination, a conventional 2D-only service, or an
          unsupported marketing claim is not enough for a high XR position.
        </p>
      </TrustSection>

      <TrustSection id="classes" title="XR technology classes">
        <dl className="classification-list">
          <div><dt><span>C4</span> Spatially anchored AR</dt><dd>The physical room remains visible and digital content keeps a stable position through anchoring or spatial understanding.</dd></div>
          <div><dt><span>C3</span> Passthrough MR</dt><dd>Headset cameras show the room while virtual content is overlaid. Stable spatial anchoring is not automatically established.</dd></div>
          <div><dt><span>C2</span> Immersive VR</dt><dd>VR180 or 360° content responds to head rotation, but the physical room is not normally visible.</dd></div>
          <div><dt><span>C1</span> Spatial or stereoscopic format</dt><dd>Separate images provide depth without proving immersive VR, passthrough MR, or AR.</dd></div>
        </dl>
        <p>
          The classes are non-compensatory: image quality, catalog size, or a
          strong commercial offer cannot turn a C2 VR experience into C3 or C4.
        </p>
      </TrustSection>

      <TrustSection id="evidence" title="Evidence levels">
        <dl className="evidence-list">
          <div><dt>E1 · Vendor claim</dt><dd>The provider uses XR, AR, or MR language without enough current technical detail to verify the exact implementation.</dd></div>
          <div><dt>E2 · Provider-documented</dt><dd>A current official provider page documents a format, named feature, passthrough workflow, or compatible device path.</dd></div>
          <div><dt>E3 · Independently tested</dt><dd>VelvetXR has recorded a reproducible result on a named headset, OS, browser or player version, and feature. No current listing has reached E3 yet.</dd></div>
        </dl>
      </TrustSection>

      <TrustSection id="conflicts" title="Conflicting or incomplete claims">
        <p>
          The most specific current technical source takes priority over broad
          homepage language. If a provider markets a service as AR but only
          documents VR180, the listing remains VR until passthrough or spatial
          functionality is documented. Catalog-level support is not treated as
          proof that every title works on every named device.
        </p>
      </TrustSection>

      <TrustSection id="webxr" title="Why WebXR is not automatically AR">
        <p>
          WebXR is an API standard that can deliver either VR or AR. A website
          does not receive a passthrough MR or AR label merely because it uses
          WebXR. VelvetXR requires separate evidence for the actual immersive
          mode and the hardware path that exposes it.
        </p>
      </TrustSection>

      <TrustSection id="commercial" title="Commercial independence">
        <p>
          Affiliate availability and commission levels are excluded from the
          score. Paid ranking placements are not offered in the current
          directory. Read the <a href="/affiliate-disclosure">Affiliate disclosure</a>{" "}
          for the current outbound-link policy.
        </p>
      </TrustSection>

      <TrustSection id="limitations" title="Current limitations and corrections">
        <ul>
          <li>Most current evidence is supplied by the platforms themselves.</li>
          <li>No listing is currently labelled E3 independently tested.</li>
          <li>Catalog-level support does not prove compatibility for every title.</li>
          <li>Availability, pricing, browser support, and playback methods can change.</li>
        </ul>
        <p>
          Each listing displays a source and the directory&apos;s review date. A
          correction should include a current official source or a reproducible
          device test through the <a href="/contact">Contact</a> page.
        </p>
      </TrustSection>
    </TrustPage>
  );
}
