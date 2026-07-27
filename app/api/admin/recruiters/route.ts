import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { recruiterCreateSchema, recruiterUpdateSchema } from "@/lib/recruitment-operations";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { data, error } = await getSupabaseAdmin().from("recruiters").select("id,created_at,updated_at,name,email,role,active").order("active", { ascending: false }).order("name");
  if (error) return NextResponse.json({ error: "Unable to load recruiters." }, { status: 500 });
  return NextResponse.json({ recruiters: data ?? [] });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const parsed = recruiterCreateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please check the recruiter details." }, { status: 400 });
  const { data, error } = await getSupabaseAdmin().from("recruiters").insert({ name: parsed.data.name, email: parsed.data.email.toLowerCase(), role: parsed.data.role || null }).select("id,created_at,updated_at,name,email,role,active").single();
  if (error) return NextResponse.json({ error: error.code === "23505" ? "A recruiter with this email already exists." : "Unable to add recruiter." }, { status: error.code === "23505" ? 409 : 500 });
  return NextResponse.json({ recruiter: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const parsed = recruiterUpdateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please check the recruiter update." }, { status: 400 });
  const { id, ...values } = parsed.data;
  const updates = { ...values, ...(values.email ? { email: values.email.toLowerCase() } : {}), updated_at: new Date().toISOString() };
  const { data, error } = await getSupabaseAdmin().from("recruiters").update(updates).eq("id", id).select("id,created_at,updated_at,name,email,role,active").single();
  if (error) return NextResponse.json({ error: error.code === "23505" ? "A recruiter with this email already exists." : "Unable to update recruiter." }, { status: error.code === "23505" ? 409 : 500 });
  return NextResponse.json({ recruiter: data });
}
