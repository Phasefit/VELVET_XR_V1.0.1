import type { ReactNode } from "react";
import Link from "next/link";

export type PageLink = {
  href: string;
  label: string;
};

export const trustLinks: PageLink[] = [
  { href: "/how-we-rank", label: "How we rank" },
  { href: "/affiliate-disclosure", label: "Affiliate disclosure" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

type TrustPageProps = {
  eyebrow: string;
  title: string;
  summary: string;
  currentPath: string;
  indexTitle?: string;
  indexLinks?: PageLink[];
  children: ReactNode;
};

export function TrustPage({
  eyebrow,
  title,
  summary,
  currentPath,
  indexTitle = "Site information",
  indexLinks = trustLinks,
  children,
}: TrustPageProps) {

  const currentDate = new Date();

  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const isoDate = currentDate.toISOString().split("T")[0];

  return (
    <>

    <div className="site-shell trust-shell">
      <a className="skip-link" href="#trust-content">
        Skip to content
      </a>

      <header className="trust-header">
        <div className="top-note">
          Independent adult XR directory · 18+ · No explicit previews
        </div>
        <div className="trust-header-main">
          <Link className="brand" href="/" aria-label="VelvetXR rankings home">
            <span className="brand-mark">V</span>
            <span className="brand-copy">
              <strong>VELVETXR</strong>
              <small>Independent adult XR directory</small>
            </span>
          </Link>
          <nav aria-label="Trust and site information">
            <Link href="/#rankings">Rankings</Link>
            <a
              href="/guides/ar-vs-vr"
              aria-current={
                currentPath === "/guides/ar-vs-vr" ? "page" : undefined
              }
            >
              AR vs. VR guide
            </a>
            {trustLinks.map((link) => (
              <a
                href={link.href}
                key={link.href}
                aria-current={currentPath === link.href ? "page" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="trust-main" id="trust-content">
        <section className="trust-hero">
          <nav className="trust-breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">VelvetXR</Link></li>
              <li aria-current="page">{title}</li>
            </ol>
          </nav>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{summary}</p>
            <span className="trust-updated">
              Last reviewed <time dateTime={isoDate}>{formattedDate}</time>
            </span>
        </section>

        <div className="trust-layout">
          <nav className="trust-index" aria-label="On this page">
            <strong>{indexTitle}</strong>
            {indexLinks.map((link) => (
              <a
                href={link.href}
                key={link.href}
                aria-current={currentPath === link.href ? "page" : undefined}
              >
                {link.label}
                <span aria-hidden="true">→</span>
              </a>
            ))}
          </nav>
          <article className="trust-article">{children}</article>
        </div>
      </main>

      <footer className="trust-footer">
        <div className="footer-brand">
          <span className="brand-mark">V</span>
          <div>
            <strong>VELVETXR</strong>
            <span>Independent guide to immersive adult XR</span>
          </div>
        </div>
        <p>18+ · Editorial rankings · Affiliate links clearly disclosed</p>
        <div className="footer-links">
          <Link href="/">Rankings</Link>
          <a href="/guides/ar-vs-vr">AR vs. VR</a>
          <a href="/affiliate-disclosure">Affiliate</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </div>
    </>
  );
}

type TrustSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function TrustSection({ id, title, children }: TrustSectionProps) {
  return (
    <section className="trust-section" id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function LaunchNotice({ children }: { children: ReactNode }) {
  return (
    <div className="launch-notice">
      <strong>Private-preview status</strong>
      <p>{children}</p>
    </div>
  );
}
