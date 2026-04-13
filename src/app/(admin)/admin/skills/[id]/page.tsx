import { notFound } from "next/navigation";
import Glass from "@/components/ui/Glass";
import PageHeader from "@/components/admin/PageHeader";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { SkillGroup } from "@/lib/supabase/types";
import SkillGroupForm from "../SkillGroupForm";
import { updateSkillGroup } from "../actions";

export default async function EditSkillGroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("skill_groups")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  const group = data as SkillGroup | null;
  if (!group) notFound();

  return (
    <>
      <PageHeader label="Expertise" title="Edit skill group" subtitle={group.title} />
      <Glass className="p-6 sm:p-8">
        <SkillGroupForm action={updateSkillGroup} group={group} submitLabel="Save changes" />
      </Glass>
    </>
  );
}
