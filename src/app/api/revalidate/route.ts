import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * On-demand revalidation for Sanity.
 *
 * The site is statically generated, so content edits only appear after the
 * pages are rebuilt. This endpoint lets Sanity trigger that rebuild the moment
 * Marjory hits "Publish" — no redeploy, no developer needed.
 *
 * Setup (once, in Sanity → API → Webhooks):
 *   - URL:    https://<site-domain>/api/revalidate?secret=<SANITY_WEBHOOK_SECRET>
 *   - Trigger: on Create, Update, Delete
 *   - Dataset: production
 *
 * `SANITY_WEBHOOK_SECRET` must match in the Vercel project env and in that URL.
 */

function isAuthorized(request: Request): boolean {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) return false; // Not configured → refuse rather than allow all.

  const url = new URL(request.url);
  const provided =
    url.searchParams.get("secret") ??
    request.headers.get("x-webhook-secret") ??
    "";

  // Constant-length compare is overkill here, but cheap and tidy.
  return provided.length === secret.length && provided === secret;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Content (site settings, labels, about, works) is shared across many pages,
  // so the simplest correct move is to revalidate everything under the root
  // layout — both locales, every route.
  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
