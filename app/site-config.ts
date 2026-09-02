/**
 * Centralized site configuration for domain and branding.
 * Domain is configurable via environment variables to support temporary deployments
 * and easy migration to velvetxr.com when available.
 */

export const SITE_URL = process.env.SITE_URL || "http://localhost:3000";
export const SITE_NAME = process.env.SITE_NAME || "VelvetXR";

/**
 * Get the full URL for a given path.
 * Ensures consistent URL formatting throughout the application.
 */
export function getSiteUrl(path: string = ""): string {
  const baseUrl = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

/**
 * Get the social image URL for Open Graph and Twitter cards.
 */
export function getSocialImageUrl(): string {
  return getSiteUrl("/og.png");
}

/**
 * Get the sitemap URL for robots.txt.
 */
export function getSitemapUrl(): string {
  return getSiteUrl("/sitemap.xml");
}
