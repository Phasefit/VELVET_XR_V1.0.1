import { platforms } from "./platform-data";

const affiliateEnvironmentKeys: Record<string, string> = {
  sexlikereal: "AFFILIATE_SEXLIKEREAL",
  arporn: "AFFILIATE_ARPORN",
  czechar: "AFFILIATE_CZECHAR",
  realvr: "AFFILIATE_REALVR",
  vrspy: "AFFILIATE_VRSPY",
  vrporn: "AFFILIATE_VRPORN",
  vrbangers: "AFFILIATE_VRBANGERS",
  realitylovers: "AFFILIATE_REALITYLOVERS",
  deovr: "AFFILIATE_DEOVR",
  vrsmash: "AFFILIATE_VRSMASH",
  povr: "AFFILIATE_POVR",
  virtualrealporn: "AFFILIATE_VIRTUALREALPORN",
  stripchatvr: "AFFILIATE_STRIPCHATVR",
  wankzvr: "AFFILIATE_WANKZVR",
  vrconk: "AFFILIATE_VRCONK",
};

function validHttpsUrl(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function configuredAffiliateUrl(slug: string) {
  const key = affiliateEnvironmentKeys[slug];
  return validHttpsUrl(key ? process.env[key] : undefined);
}

export function getAffiliateStatus() {
  const activePlatformIds = platforms
    .filter((platform) => Boolean(configuredAffiliateUrl(platform.id)))
    .map((platform) => platform.id);

  return {
    activePlatformIds,
    activeCount: activePlatformIds.length,
    totalCount: platforms.length,
  };
}

export function getReferralTarget(slug: string) {
  const platform = platforms.find((entry) => entry.id === slug);
  if (!platform) return null;

  const partnerUrl = configuredAffiliateUrl(slug);

  return {
    url: partnerUrl ?? platform.url,
    isAffiliate: Boolean(partnerUrl),
  };
}
