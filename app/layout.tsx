import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://www.velvetxr.com";
const socialImage = `${SITE_URL}/og.png`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "Best VR Porn, AR & Passthrough MR Sites (2026) | VelvetXR",
      template: "%s | VelvetXR",
    },
    description:
      "Compare VR porn, AR and passthrough MR platforms for Meta Quest, Apple Vision Pro, PCVR, PICO and mobile, ranked by documented XR capabilities.",
    alternates: { canonical: "/" },
    openGraph: {
      title: "Best VR Porn, AR & Passthrough MR Sites (2026) | VelvetXR",
      description:
        "Compare leading adult XR platforms by device support and documented VR, AR and passthrough MR capabilities.",
      type: "website",
      siteName: "VelvetXR",
      locale: "en",
      url: SITE_URL,
      images: [{ url: socialImage, width: 1536, height: 1024, alt: "VelvetXR — Immersive XR, clearly ranked" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Best VR Porn, AR & Passthrough MR Sites (2026) | VelvetXR",
      description: "Compare leading adult XR platforms by device support and documented capabilities.",
      images: [socialImage],
    },
    robots: { index: false, follow: false },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
