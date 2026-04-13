import Glass from "@/components/ui/Glass";
import PageHeader from "@/components/admin/PageHeader";
import ProjectForm from "../ProjectForm";
import { createProject } from "../actions";

export default function NewProjectPage() {
  return (
    <>
      <PageHeader
        label="Portfolio"
        title="New project"
        subtitle="Add a new card to the Work section."
      />
      <Glass className="p-6 sm:p-8">
        <ProjectForm action={createProject} submitLabel="Create project" />
      </Glass>
    </>
  );
}
