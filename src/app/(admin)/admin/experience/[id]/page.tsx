import { notFound } from "next/navigation";
import Glass from "@/components/ui/Glass";
import PageHeader from "@/components/admin/PageHeader";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ExperienceRow } from "@/lib/supabase/types";
import ExperienceForm from "../ExperienceForm";
import { updateExperience } from "../actions";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("experience")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  const item = data as ExperienceRow | null;
  if (!item) notFound();

  return (
    <>
      <PageHeader label="Journey" title="Edit entry" subtitle={item.role} />
      <Glass className="p-6 sm:p-8">
        <ExperienceForm action={updateExperience} item={item} submitLabel="Save changes" />
      </Glass>
    </>
  );
}
