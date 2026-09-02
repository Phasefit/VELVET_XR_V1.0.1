import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL, SITE_NAME, getSocialImageUrl } from "./site-config";

const socialImage = getSocialImageUrl();

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `Best VR Porn, AR & Passthrough MR Sites (2026) | ${SITE_NAME}`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      "Compare VR porn, AR and passthrough MR platforms for Meta Quest, Apple Vision Pro, PCVR, PICO and mobile, ranked by documented XR capabilities.",
    alternates: { canonical: "/" },
    openGraph: {
      title: `Best VR Porn, AR & Passthrough MR Sites (2026) | ${SITE_NAME}`,
      description:
        "Compare leading adult XR platforms by device support and documented VR, AR and passthrough MR capabilities.",
      type: "website",
      siteName: SITE_NAME,
      locale: "en",
      url: SITE_URL,
      images: [{ url: socialImage, width: 1536, height: 1024, alt: `${SITE_NAME} — Immersive XR, clearly ranked` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Best VR Porn, AR & Passthrough MR Sites (2026) | ${SITE_NAME}`,
      description: "Compare leading adult XR platforms by device support and documented capabilities.",
      images: [socialImage],
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
