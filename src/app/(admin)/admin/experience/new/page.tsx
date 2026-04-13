import Glass from "@/components/ui/Glass";
import PageHeader from "@/components/admin/PageHeader";
import ExperienceForm from "../ExperienceForm";
import { createExperience } from "../actions";

export default function NewExperiencePage() {
  return (
    <>
      <PageHeader label="Journey" title="New entry" />
      <Glass className="p-6 sm:p-8">
        <ExperienceForm action={createExperience} submitLabel="Create entry" />
      </Glass>
    </>
  );
}
