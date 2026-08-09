import { getReferralTarget } from "../../affiliate-config";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const target = getReferralTarget(slug);
  const privateHeaders = {
    "Cache-Control": "private, no-store",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
  };

  if (!target) {
    return new Response("Unknown platform", {
      status: 404,
      headers: privateHeaders,
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      ...privateHeaders,
      Location: target.url,
    },
  });
}
