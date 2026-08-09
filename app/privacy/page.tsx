import type { Metadata } from "next";
import { hasPublicOperatorDetails, publicSiteDetails } from "../site-settings";
import { LaunchNotice, TrustPage, TrustSection } from "../trust-page";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What VelvetXR stores locally, what its hosting infrastructure may process, and what happens when you follow an external link.",
};

export default function PrivacyPage() {
  return (
    <TrustPage
      eyebrow="Plain-language privacy"
      title="Privacy"
      summary="VelvetXR is designed as a low-data directory. It has no visitor accounts, does not ask for a date of birth, and uses browser storage only for device-local preferences."
      currentPath="/privacy"
    >
      {!hasPublicOperatorDetails && (
        <LaunchNotice>
          Verified operator identity, address, and public contact details must be
          added before VelvetXR is opened for public traffic. The site remains a
          private preview until that information is complete.
        </LaunchNotice>
      )}

      <TrustSection id="controller" title="Site operator">
        {publicSiteDetails.operatorName ? (
          <address className="operator-details">
            <span><strong>Operator</strong>{publicSiteDetails.operatorName}</span>
            {publicSiteDetails.operatorAddress && (
              <span><strong>Address</strong>{publicSiteDetails.operatorAddress}</span>
            )}
            {publicSiteDetails.organizationNumber && (
              <span><strong>Organisation number</strong>{publicSiteDetails.organizationNumber}</span>
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
            Public operator details are intentionally not shown in this private
            preview. They will be verified and published before public launch.
          </p>
        )}
      </TrustSection>

      <TrustSection id="local-storage" title="Information stored on your device">
        <p>VelvetXR uses browser storage for three limited functions:</p>
        <ul>
          <li>
            age confirmation is kept only for the current browser session;
          </li>
          <li>
            discreet mode is stored when you actively enable or disable it; and
          </li>
          <li>
            favourites are stored when you actively save or remove a listing.
          </li>
        </ul>
        <p>
          Discreet mode and favourites remain in your browser until you reset
          them on the site or clear its local data. Search terms, comparison
          choices, and filters are not saved after the page session. VelvetXR
          does not ask for your name, date of birth, payment details, or a user
          profile to provide these functions.
        </p>
      </TrustSection>

      <TrustSection id="cookies" title="Cookies and analytics">
        <p>
          The VelvetXR application currently sets no advertising or behavioural
          analytics cookies and contains no advertising pixels. While the site
          remains private, the hosting and access provider may use essential
          session or security storage to authenticate authorised visitors and
          protect the service.
        </p>
      </TrustSection>

      <TrustSection id="connection-data" title="Hosting and connection data">
        <p>
          Delivering a page or redirect necessarily exposes connection
          information, such as an IP address and requested path, to the hosting
          infrastructure. The final public policy will identify the verified
          hosting entity, exact security and request-log fields, purposes, legal
          bases, retention periods, processors, and processing locations before
          public access is enabled.
        </p>
        <p>
          VelvetXR does not use connection information to create behavioural
          advertising profiles.
        </p>
      </TrustSection>

      <TrustSection id="external-sites" title="External platforms">
        <p>
          When you follow an outbound link, the destination platform receives
          information sent by your browser and applies its own privacy policy,
          cookies, account rules, and payment practices. VelvetXR does not
          receive payment details you submit to an external platform. An active
          affiliate program may report attributed conversion information under
          its own terms.
        </p>
      </TrustSection>

      <TrustSection id="choices" title="Your choices and rights">
        <p>
          The homepage footer can clear the session confirmation, discreet-mode
          preference, and saved favourites in one action. You can also clear all
          stored site data through your browser.
        </p>
        <p>
          Once the verified contact channel is active, it can be used for access,
          correction, deletion, restriction, objection, portability, and other
          applicable privacy requests. You may also contact the{" "}
          <a
            href="https://www.datatilsynet.no/en/about-us/contact-us/how-to-complain-to-the-norwegian-dpa/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Norwegian Data Protection Authority
          </a>.
        </p>
      </TrustSection>
    </TrustPage>
  );
}
