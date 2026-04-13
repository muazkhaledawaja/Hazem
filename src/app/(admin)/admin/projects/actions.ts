"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

function parseForm(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    accent: String(formData.get("accent") ?? "#62b6cb").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();
  const payload = parseForm(formData);
  const { error } = await supabase.from("projects").insert(payload);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/projects");
}

export async function updateProject(formData: FormData) {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing project id");
  const payload = parseForm(formData);
  const { error } = await supabase.from("projects").update(payload).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing project id");
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}
