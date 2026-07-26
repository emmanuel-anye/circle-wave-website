import { NextResponse } from "next/server";
import { isRateLimited } from "@/lib/request-security";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { notifyAdmin } from "@/lib/submission-notifications";
import { processEmployerSubmission } from "@/lib/employer-submission";

export async function POST(request: Request) {
  if (isRateLimited(request, "employer")) {
    return NextResponse.json({ error: "Too many submissions. Try again shortly." }, { status: 429 });
  }
  const result = await processEmployerSubmission(
    await request.json().catch(() => null),
    {
      insert: async (payload) => {
        const { error } = await getSupabaseAdmin()
          .from("employer_requests")
          .insert(payload);
        return { error };
      },
      notify: (payload) =>
        notifyAdmin("New employer hiring brief", payload),
    }
  );

  return NextResponse.json(result.body, { status: result.status });
}
