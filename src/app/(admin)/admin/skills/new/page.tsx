import Glass from "@/components/ui/Glass";
import PageHeader from "@/components/admin/PageHeader";
import SkillGroupForm from "../SkillGroupForm";
import { createSkillGroup } from "../actions";

export default function NewSkillGroupPage() {
  return (
    <>
      <PageHeader label="Expertise" title="New skill group" />
      <Glass className="p-6 sm:p-8">
        <SkillGroupForm action={createSkillGroup} submitLabel="Create group" />
      </Glass>
    </>
  );
}
