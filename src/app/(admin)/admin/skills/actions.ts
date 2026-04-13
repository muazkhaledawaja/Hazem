"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { SkillTone } from "@/lib/supabase/types";

const TONES: SkillTone[] = ["pacific", "fresh", "frozen"];

function parseForm(formData: FormData) {
  const rawTone = String(formData.get("tone") ?? "pacific");
  const tone: SkillTone = TONES.includes(rawTone as SkillTone)
    ? (rawTone as SkillTone)
    : "pacific";
  const itemsRaw = String(formData.get("items") ?? "");
  const items = itemsRaw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  return {
    title: String(formData.get("title") ?? "").trim(),
    tone,
    items,
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/skills");
}

export async function createSkillGroup(formData: FormData) {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("skill_groups").insert(parseForm(formData));
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/skills");
}

export async function updateSkillGroup(formData: FormData) {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing skill group id");
  const { error } = await supabase
    .from("skill_groups")
    .update(parseForm(formData))
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
  redirect("/admin/skills");
}

export async function deleteSkillGroup(formData: FormData) {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing skill group id");
  const { error } = await supabase.from("skill_groups").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}
