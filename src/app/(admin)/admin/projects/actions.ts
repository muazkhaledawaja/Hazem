"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "portfolio-images";

type ProjectPayload = {
  title: string;
  category: string;
  description: string;
  accent: string;
  sort_order: number;
};

function parseForm(formData: FormData): ProjectPayload {
  return {
    title: String(formData.get("title") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    accent: String(formData.get("accent") ?? "#62b6cb").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

async function resolveImageUrl(
  supabase: SupabaseClient,
  formData: FormData,
  existingUrl: string | null
): Promise<string | null> {
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${crypto.randomUUID()}-${safeName}`;
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });
    if (error) throw new Error(`Upload failed: ${error.message}`);
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
  }

  const pasted = String(formData.get("image_url") ?? "").trim();
  if (pasted) return pasted;

  return existingUrl;
}

async function removeStorageFileFromUrl(
  supabase: SupabaseClient,
  url: string | null
) {
  if (!url) return;
  // Public URL shape: https://<project>.supabase.co/storage/v1/object/public/portfolio-images/<path>
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return;
  const path = url.slice(idx + marker.length);
  if (!path) return;
  await supabase.storage.from(BUCKET).remove([path]);
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
  const imageUrl = await resolveImageUrl(supabase, formData, null);
  const { error } = await supabase
    .from("projects")
    .insert({ ...payload, image_url: imageUrl });
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/projects");
}

export async function updateProject(formData: FormData) {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing project id");

  const { data: existing } = await supabase
    .from("projects")
    .select("image_url")
    .eq("id", id)
    .maybeSingle();

  const payload = parseForm(formData);
  const imageUrl = await resolveImageUrl(
    supabase,
    formData,
    existing?.image_url ?? null
  );

  const { error } = await supabase
    .from("projects")
    .update({ ...payload, image_url: imageUrl })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidateAll();
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing project id");

  const { data: existing } = await supabase
    .from("projects")
    .select("image_url")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);

  try {
    await removeStorageFileFromUrl(supabase, existing?.image_url ?? null);
  } catch {
    // Stale storage files are acceptable; don't fail the delete on cleanup.
  }

  revalidateAll();
}
