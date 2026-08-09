import type { Metadata } from "next";
import { hasPublicOperatorDetails, publicSiteDetails } from "../site-settings";
import { LaunchNotice, TrustPage, TrustSection } from "../trust-page";

export const metadata: Metadata = {
  title: "Contact and Site Information",
  description:
    "VelvetXR operator information and the contact channel for corrections, privacy requests, accessibility feedback, and commercial enquiries.",
};

export default function ContactPage() {
  return (
    <TrustPage
      eyebrow="Operator and enquiries"
      title="Contact and site information"
      summary="Use the verified contact channel for factual corrections, privacy requests, accessibility feedback, or clearly identified commercial enquiries."
      currentPath="/contact"
    >
      {!hasPublicOperatorDetails && (
        <LaunchNotice>
          No public inbox is active in this private preview, so this page does
          not collect messages yet. Verified operator, address, and direct
          contact details must be configured before public launch.
        </LaunchNotice>
      )}

      <TrustSection id="operator" title="Operator information">
        {publicSiteDetails.operatorName ? (
          <address className="operator-details">
            <span><strong>Operator</strong>{publicSiteDetails.operatorName}</span>
            {publicSiteDetails.operatorAddress && (
              <span><strong>Address</strong>{publicSiteDetails.operatorAddress}</span>
            )}
            {publicSiteDetails.businessRegister && (
              <span><strong>Business register</strong>{publicSiteDetails.businessRegister}</span>
            )}
            {publicSiteDetails.organizationNumber && (
              <span><strong>Organisation number</strong>{publicSiteDetails.organizationNumber}</span>
            )}
            {publicSiteDetails.vatDetails && (
              <span><strong>VAT status</strong>{publicSiteDetails.vatDetails}</span>
            )}
            {publicSiteDetails.contactEmail && (
              <span>
                <strong>Email</strong>
                <a href={"mailto:" + publicSiteDetails.contactEmail}>
                  {publicSiteDetails.contactEmail}
                </a>
              </span>
            )}
          </address>
        ) : (
          <p>
            Public operator details are awaiting verification. No invented
            company name, organisation number, address, or email is displayed.
          </p>
        )}
      </TrustSection>

      <TrustSection id="use-cases" title="What to include">
        <ul>
          <li>
            <strong>Directory correction:</strong> platform name, exact claim,
            current official source URL, and the date you checked it.
          </li>
          <li>
            <strong>Technical compatibility:</strong> headset, OS, browser or
            player version, feature tested, and observed result.
          </li>
          <li>
            <strong>Privacy request:</strong> the request type and enough detail
            to identify the relevant interaction without sending sensitive data.
          </li>
          <li>
            <strong>Commercial enquiry:</strong> company identity, relationship
            to the listed platform, and a clear description of the proposal.
          </li>
        </ul>
      </TrustSection>

      <TrustSection id="editorial-boundary" title="Editorial boundary">
        <p>
          Requests to purchase a ranking position or alter an XR classification
          without supporting evidence are not accepted. New technical evidence
          can lead to a correction regardless of whether a commercial
          relationship exists.
        </p>
      </TrustSection>
    </TrustPage>
  );
}
