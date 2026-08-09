import type { Metadata } from "next";
import { getAffiliateStatus } from "../affiliate-config";
import { TrustPage, TrustSection } from "../trust-page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "How VelvetXR discloses possible commission links while keeping adult XR rankings editorially independent.",
};

export default function AffiliateDisclosurePage() {
  const { activeCount, totalCount } = getAffiliateStatus();
  const hasActiveLinks = activeCount > 0;

  return (
    <TrustPage
      eyebrow="Commercial transparency"
      title="Affiliate disclosure"
      summary="Commission-paying links are identified in the external-link notice before they open. Commercial relationships do not determine rankings, XR classifications, or evidence labels."
      currentPath="/affiliate-disclosure"
    >
      <div className="status-panel">
        <span>Current affiliate status · 9 August 2026</span>
        <strong>
          {hasActiveLinks
            ? `${activeCount} of ${totalCount} destinations currently use a configured affiliate URL.`
            : "No commission-paying affiliate URLs are currently configured."}
        </strong>
        <p>
          {hasActiveLinks
            ? "The outbound notice labels an active destination as a paid link before you continue."
            : "Directory links currently use each platform's standard official URL."}
        </p>
      </div>

      <TrustSection id="what-affiliate-means" title="What a paid link means">
        <p>
          When a paid affiliate URL is active, VelvetXR may receive a commission
          if you register, subscribe, or make a qualifying purchase after
          following that link. The platform—not VelvetXR—sets the attribution
          window, eligibility rules, and commission terms.
        </p>
        <p>
          VelvetXR does not set the destination platform&apos;s price. Check the
          final price, trial conditions, renewal terms, and regional availability
          on the destination platform before you purchase.
        </p>
      </TrustSection>

      <TrustSection id="redirects" title="How outbound links work">
        <p>
          Directory buttons pass through VelvetXR&apos;s own redirect route. If
          a valid affiliate URL is configured for that platform, the route uses
          it. Otherwise, it falls back to the platform&apos;s standard official
          URL.
        </p>
        <p>
          Before an external 18+ platform opens, VelvetXR displays a contextual
          notice that identifies the destination and states whether its current
          URL is a paid affiliate link or a standard external link.
        </p>
      </TrustSection>

      <TrustSection id="editorial-independence" title="Editorial independence">
        <ul>
          <li>Affiliate status does not add points to a platform&apos;s XR score.</li>
          <li>Paid ranking positions are not offered in the current directory.</li>
          <li>
            Technology labels depend on documented functionality and evidence,
            not commission rates.
          </li>
          <li>
            A platform can remain highly ranked without an affiliate agreement.
          </li>
        </ul>
        <p>
          The complete scoring framework is available on the{" "}
          <a href="/how-we-rank">How we rank</a> page.
        </p>
      </TrustSection>

      <TrustSection id="verification" title="Offers and platform claims">
        <p>
          VelvetXR does not process subscriptions or payments. Product claims,
          final prices, billing terms, refund rules, and technical compatibility
          are governed by the destination platform. A listing is not a guarantee
          that every title or feature works on every headset, browser, or region.
        </p>
      </TrustSection>
    </TrustPage>
  );
}
