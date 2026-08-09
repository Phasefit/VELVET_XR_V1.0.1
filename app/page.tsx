import { getAffiliateStatus } from "./affiliate-config";
import { DirectoryClient } from "./directory-client";

export const dynamic = "force-dynamic";

export default function Home() {
  const { activePlatformIds } = getAffiliateStatus();
  return <DirectoryClient affiliatePlatformIds={activePlatformIds} />;
}
