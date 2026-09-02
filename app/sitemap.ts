import type { MetadataRoute } from "next";
import { getSiteUrl } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: getSiteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: getSiteUrl("/how-we-rank"), changeFrequency: "monthly", priority: 0.7 },
    { url: getSiteUrl("/guides/ar-vs-vr"), changeFrequency: "monthly", priority: 0.8 },
    { url: getSiteUrl("/affiliate-disclosure"), changeFrequency: "yearly", priority: 0.4 },
    { url: getSiteUrl("/privacy"), changeFrequency: "yearly", priority: 0.3 },
    { url: getSiteUrl("/terms"), changeFrequency: "yearly", priority: 0.3 },
    { url: getSiteUrl("/contact"), changeFrequency: "yearly", priority: 0.3 },
  ];
}
