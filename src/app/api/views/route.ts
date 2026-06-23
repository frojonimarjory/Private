import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/client";

export async function POST(request: Request) {
  try {
    const { slug, locale } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: "Slug required" }, { status: 400 });
    }

    const supabase = getSupabase();
    if (supabase) {
      const { error } = await supabase.from("work_views").insert({
        work_slug: slug,
        locale: locale || "en",
        referrer: request.headers.get("referer") || null,
      });

      if (error) {
        console.error("Supabase error:", error);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
