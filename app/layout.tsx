import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

async function requestOrigin() {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders
    .get("x-forwarded-host")
    ?.split(",")[0]
    ?.trim();
  const host = forwardedHost ?? requestHeaders.get("host") ?? "localhost:3000";
  const forwardedProtocol = requestHeaders
    .get("x-forwarded-proto")
    ?.split(",")[0]
    ?.trim();
  const protocol =
    forwardedProtocol === "http" || host.startsWith("localhost")
      ? "http"
      : "https";

  try {
    return new URL(`${protocol}://${host}`).origin;
  } catch {
    return "http://localhost:3000";
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const origin = await requestOrigin();
  const socialImage = `${origin}/og.png`;

  return {
    metadataBase: new URL(origin),
    title: {
      default: "Best VR Porn, AR & Passthrough MR Sites (2026) | VelvetXR",
      template: "%s | VelvetXR",
    },
    description:
      "Compare VR porn, AR and passthrough MR platforms for Meta Quest, Apple Vision Pro, PCVR, PICO and mobile, ranked by documented XR capabilities.",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: "Best VR Porn, AR & Passthrough MR Sites (2026) | VelvetXR",
      description:
        "Compare leading adult XR platforms by device support and documented VR, AR and passthrough MR capabilities.",
      type: "website",
      siteName: "VelvetXR",
      locale: "en",
      url: origin,
      images: [
        {
          url: socialImage,
          width: 1536,
          height: 1024,
          alt: "VelvetXR — Immersive XR, clearly ranked",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Best VR Porn, AR & Passthrough MR Sites (2026) | VelvetXR",
      description:
        "Compare leading adult XR platforms by device support and documented capabilities.",
      images: [socialImage],
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
