"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const BUCKET = "portfolio-cv";
const STORAGE_PATH = "cv.pdf";

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/cv");
}

export async function uploadCv(formData: FormData) {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();

  const file = formData.get("cv_file");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("No file provided.");
  }
  if (file.type !== "application/pdf") {
    throw new Error("Only PDF files are accepted.");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File exceeds the 5 MB limit.");
  }

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(STORAGE_PATH, file, {
      contentType: "application/pdf",
      upsert: true,
    });
  if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

  const { data: urlData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(STORAGE_PATH);

  const file_url = `${urlData.publicUrl}?t=${Date.now()}`;
  const filename = file.name;

  const { error: dbError } = await supabase
    .from("cv")
    .upsert({ id: 1, filename, file_url, uploaded_at: new Date().toISOString() });
  if (dbError) throw new Error(`DB upsert failed: ${dbError.message}`);

  revalidateAll();
}

export async function deleteCv() {
  await requireAdmin();
  const supabase = createSupabaseAdminClient();

  await supabase.storage.from(BUCKET).remove([STORAGE_PATH]);

  const { error } = await supabase.from("cv").delete().eq("id", 1);
  if (error) throw new Error(`DB delete failed: ${error.message}`);

  revalidateAll();
}
