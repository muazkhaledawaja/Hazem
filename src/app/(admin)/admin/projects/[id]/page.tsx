import { notFound } from "next/navigation";
import Glass from "@/components/ui/Glass";
import PageHeader from "@/components/admin/PageHeader";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/supabase/types";
import ProjectForm from "../ProjectForm";
import { updateProject } from "../actions";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  const project = data as Project | null;
  if (!project) notFound();

  return (
    <>
      <PageHeader
        label="Portfolio"
        title="Edit project"
        subtitle={project.title}
      />
      <Glass className="p-6 sm:p-8">
        <ProjectForm action={updateProject} project={project} submitLabel="Save changes" />
      </Glass>
    </>
  );
}
