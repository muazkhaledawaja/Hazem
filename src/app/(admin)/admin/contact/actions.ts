"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { ContactContent } from "@/lib/supabase/types";

export async function updateContact(formData: FormData) {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();

  const value: ContactContent = {
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    linkedin: String(formData.get("linkedin") ?? "").trim(),
    blurb: String(formData.get("blurb") ?? "").trim(),
  };

  const { error } = await supabase
    .from("site_content")
    .upsert({ key: "contact", value });
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/contact");
  redirect("/admin/contact");
}
