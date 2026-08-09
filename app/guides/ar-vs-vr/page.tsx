import type { Metadata } from "next";
import Link from "next/link";
import { TrustPage, TrustSection, type PageLink } from "../../trust-page";

export const metadata: Metadata = {
  title: "AR vs VR: Passthrough MR, VR180 and WebXR Explained",
  description:
    "Understand spatial AR, passthrough mixed reality, VR180, 360-degree video, stereoscopic 3D, and what WebXR actually proves.",
};

const guideLinks: PageLink[] = [
  { href: "#quick-answer", label: "Quick answer" },
  { href: "#comparison", label: "C1–C4 comparison" },
  { href: "#immersive-vr", label: "VR180 and 360°" },
  { href: "#passthrough-mr", label: "Passthrough MR" },
  { href: "#spatial-ar", label: "Spatial AR" },
  { href: "#webxr", label: "What WebXR means" },
  { href: "#devices", label: "Choosing by device" },
  { href: "#claims", label: "Checking provider claims" },
];

export default function ArVsVrGuidePage() {
  return (
    <TrustPage
      eyebrow="Adult XR technology guide"
      title="AR vs VR: what passthrough MR, VR180 and WebXR actually mean"
      summary="VR normally replaces your view of the physical room. Passthrough MR overlays digital content on a live camera view. Spatial AR requires a more stable relationship with the room, while WebXR is an API—not proof of either mode."
      currentPath="/guides/ar-vs-vr"
      indexTitle="In this guide"
      indexLinks={guideLinks}
    >
      <TrustSection id="quick-answer" title="The quick answer">
        <div className="answer-grid">
          <div><strong>VR</strong><p>Replaces the physical room with an immersive scene. VR180 and 360° are common video formats.</p></div>
          <div><strong>Passthrough MR</strong><p>Uses headset cameras to show the room and places isolated digital content over that live view.</p></div>
          <div><strong>Spatial AR</strong><p>Requires digital content to remain meaningfully positioned relative to the physical environment.</p></div>
          <div><strong>WebXR</strong><p>Provides browser APIs for immersive sessions. The name alone does not establish whether a session is VR or AR.</p></div>
        </div>
      </TrustSection>

      <TrustSection id="comparison" title="VelvetXR's C1–C4 comparison">
        <div className="table-scroll">
          <table className="comparison-table">
            <thead>
              <tr><th>Class</th><th>Physical room visible?</th><th>Typical tracking</th><th>What the label establishes</th></tr>
            </thead>
            <tbody>
              <tr><th>C4 · Spatial AR</th><td>Yes</td><td>6DoF plus anchoring or spatial understanding</td><td>Digital content relates consistently to the physical environment.</td></tr>
              <tr><th>C3 · Passthrough MR</th><td>Yes, through cameras</td><td>Head tracking; anchoring may vary</td><td>Virtual content is overlaid on the live room view.</td></tr>
              <tr><th>C2 · Immersive VR</th><td>Normally no</td><td>Head rotation and, depending on the app, positional tracking</td><td>The viewer is immersed in VR180, 360°, or a virtual environment.</td></tr>
              <tr><th>C1 · Stereo / spatial</th><td>Not established</td><td>May be fixed-view</td><td>Separate eye images create depth without proving VR, MR, or AR.</td></tr>
            </tbody>
          </table>
        </div>
      </TrustSection>

      <TrustSection id="immersive-vr" title="VR180, 360°, and immersive VR">
        <p>
          VR180 places stereoscopic imagery across the front half of the viewing
          sphere. It usually offers more pixel detail where the viewer is
          expected to look. A 360° format surrounds the viewer in every
          direction, often spreading the available resolution across a larger
          area.
        </p>
        <p>
          Both can respond to head rotation and feel immersive, but neither
          automatically exposes the physical room. A high-resolution VR180 file
          remains VR even when a provider uses broad “XR” language.
        </p>
      </TrustSection>

      <TrustSection id="passthrough-mr" title="Passthrough mixed reality">
        <p>
          Passthrough MR uses the headset&apos;s outward-facing cameras to show a
          live view of the room. The player or application then overlays isolated
          digital imagery, commonly using alpha transparency, chroma-key
          processing, or AI-assisted background removal.
        </p>
        <p>
          This can create a convincing mixed-reality effect without proving
          persistent room anchors, depth-aware occlusion, or a volumetric subject.
          VelvetXR therefore labels documented camera-overlay experiences C3
          passthrough MR rather than automatically calling them spatial AR.
        </p>
      </TrustSection>

      <TrustSection id="spatial-ar" title="Spatially anchored AR">
        <p>
          A stronger AR implementation understands more than transparency. A
          digital subject should retain a stable relationship to surfaces or
          positions in the room as the viewer moves. Depth, occlusion, anchors,
          and scene understanding can all matter, depending on the experience.
        </p>
        <p>
          No current VelvetXR listing has been independently tested and labelled
          C4. That is why the directory separates spatial AR from provider claims
          that describe ordinary passthrough as “AR.”
        </p>
      </TrustSection>

      <TrustSection id="webxr" title="What WebXR actually tells you">
        <p>
          WebXR is a browser API standard for requesting immersive sessions and
          connecting web content to compatible XR hardware. It can support
          virtual-reality or augmented-reality session modes, depending on the
          browser, device, permissions, and implementation.
        </p>
        <p>
          A WebXR badge is therefore evidence of a delivery path—not proof of a
          specific passthrough or AR experience. See the{" "}
          <a
            href="https://www.w3.org/TR/webxr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            W3C WebXR Device API
          </a>{" "}
          for the technical standard.
        </p>
      </TrustSection>

      <TrustSection id="devices" title="Choosing by device">
        <dl className="device-guidance">
          <div><dt>Meta Quest</dt><dd>Look for the exact Quest generation, player, browser path, and whether the claim covers content passthrough rather than only the app interface.</dd></div>
          <div><dt>Apple Vision Pro</dt><dd>Confirm whether support is native, browser-based, or dependent on a third-party player; generic Apple compatibility is not enough.</dd></div>
          <div><dt>PCVR</dt><dd>Check the headset runtime and player. A PCVR download may provide immersive video without access to camera passthrough.</dd></div>
          <div><dt>PICO</dt><dd>Verify the exact PICO model and app version because passthrough features can differ from general VR playback support.</dd></div>
          <div><dt>Mobile</dt><dd>Stereoscopic mobile playback can provide depth, but it does not by itself establish tracked VR or passthrough MR.</dd></div>
        </dl>
      </TrustSection>

      <TrustSection id="claims" title="How to evaluate a provider claim">
        <ul className="check-list">
          <li>Does the provider name the exact headset, browser, app, or player?</li>
          <li>Does “passthrough” apply to the content or only to the interface?</li>
          <li>Is the feature documented on a current official page?</li>
          <li>Does the evidence describe transparency, spatial anchoring, or both?</li>
          <li>Is support stated per title, per category, or only for the platform generally?</li>
        </ul>
        <p>
          Apply these distinctions directly in the <Link href="/#rankings">VelvetXR rankings</Link>, or read the full{" "}
          <a href="/how-we-rank">ranking methodology</a>.
        </p>
      </TrustSection>
    </TrustPage>
  );
}
