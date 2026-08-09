import type { Metadata } from "next";
import { hasPublicOperatorDetails } from "../site-settings";
import { LaunchNotice, TrustPage, TrustSection } from "../trust-page";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Plain-language terms for using the VelvetXR adult XR comparison directory.",
};

export default function TermsPage() {
  return (
    <TrustPage
      eyebrow="Site information"
      title="Terms of use"
      summary="These terms explain what VelvetXR provides, what it does not provide, and what to expect when you follow a link to an independent 18+ platform."
      currentPath="/terms"
    >
      {!hasPublicOperatorDetails && (
        <LaunchNotice>
          Operator identity, contact information, and final jurisdictional terms
          will be completed before public launch. These preview terms do not
          replace that final publication.
        </LaunchNotice>
      )}

      <TrustSection id="eligibility" title="18+ eligibility">
        <p>
          VelvetXR is intended only for adults who are at least 18 and meet any
          higher legal-age requirement that applies where they live. The age
          prompt records a user declaration for the current browser session;
          VelvetXR does not independently verify age.
        </p>
      </TrustSection>

      <TrustSection id="directory" title="An informational directory">
        <p>
          VelvetXR compares documented XR formats, device support, access
          methods, and evidence quality. It does not host adult videos, sell
          third-party subscriptions, process payments, or provide a user
          account.
        </p>
        <p>
          Scores and classifications are editorial assessments based on the
          sources and methodology available at the review date. They are not a
          promise that every feature will work on a specific device, browser,
          operating system, network, or location.
        </p>
      </TrustSection>

      <TrustSection id="external-services" title="Independent external services">
        <p>
          Each linked platform is independent from VelvetXR and controls its own
          content, prices, account rules, age checks, privacy practices, billing,
          renewals, refunds, availability, and technical support. Check material
          terms directly before creating an account or paying.
        </p>
      </TrustSection>

      <TrustSection id="commercial-links" title="Affiliate links">
        <p>
          Some outbound links may become affiliate links. VelvetXR may then earn
          a commission from a qualifying action. Commercial relationships do not
          determine rankings. Read the full{" "}
          <a href="/affiliate-disclosure">Affiliate disclosure</a> for the
          current status and link policy.
        </p>
      </TrustSection>

      <TrustSection id="permitted-use" title="Permitted use">
        <p>
          You may use VelvetXR for personal comparison and research. Do not use
          the site to interfere with its operation, bypass access controls,
          distribute malicious code, automate abusive requests, or misrepresent
          VelvetXR&apos;s rankings as your own testing.
        </p>
      </TrustSection>

      <TrustSection id="content-rights" title="Names, marks, and site content">
        <p>
          Platform names and trademarks belong to their respective owners and
          are used for identification and comparison. VelvetXR&apos;s original
          text, ranking framework, interface, and branding may not be republished
          as a competing directory without permission.
        </p>
      </TrustSection>

      <TrustSection id="updates" title="Corrections and changes">
        <p>
          XR functionality and commercial offers can change. VelvetXR may update
          listings, scores, these terms, or the directory structure when new
          evidence becomes available. Material corrections should be submitted
          through the <a href="/contact">Contact</a> page.
        </p>
        <p>
          Nothing in these terms excludes or limits rights or liabilities that
          cannot lawfully be excluded or limited.
        </p>
      </TrustSection>
    </TrustPage>
  );
}
