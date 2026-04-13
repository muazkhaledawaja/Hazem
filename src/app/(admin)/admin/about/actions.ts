"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { AboutContent } from "@/lib/supabase/types";

export async function updateAbout(formData: FormData) {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();

  const statLabels = formData.getAll("stat_label").map((s) => String(s).trim());
  const statValues = formData.getAll("stat_value").map((s) => String(s).trim());
  const stats = statLabels
    .map((label, i) => ({ label, value: statValues[i] ?? "" }))
    .filter((s) => s.label || s.value);

  const value: AboutContent = {
    bioPrimary: String(formData.get("bioPrimary") ?? "").trim(),
    bioSecondary: String(formData.get("bioSecondary") ?? "").trim(),
    badgeTop: String(formData.get("badgeTop") ?? "").trim(),
    badgeBottom: String(formData.get("badgeBottom") ?? "").trim(),
    stats,
  };

  const { error } = await supabase
    .from("site_content")
    .upsert({ key: "about", value });
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/about");
  redirect("/admin/about");
}
