import type { MetadataRoute } from "next";

const SITE_URL = "https://www.velvetxr.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/how-we-rank`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/guides/ar-vs-vr`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/affiliate-disclosure`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
