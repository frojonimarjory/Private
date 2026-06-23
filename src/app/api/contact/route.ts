import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    if (supabase) {
      const { error } = await supabase.from("contact_submissions").insert({
        name,
        email,
        message,
      });

      if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json(
          { error: "Failed to save message" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
