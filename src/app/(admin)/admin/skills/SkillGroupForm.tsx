import { Field, SelectField, TextField } from "@/components/admin/Field";
import SubmitButton from "@/components/admin/SubmitButton";
import type { SkillGroup } from "@/lib/supabase/types";

const TONES = [
  { value: "pacific", label: "Pacific (cyan)" },
  { value: "fresh", label: "Fresh (blue)" },
  { value: "frozen", label: "Frozen (pale)" },
];

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  group?: SkillGroup;
  submitLabel?: string;
};

export default function SkillGroupForm({ action, group, submitLabel = "Save" }: Props) {
  return (
    <form action={action} className="flex flex-col gap-5">
      {group && <input type="hidden" name="id" value={group.id} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Title" name="title" required defaultValue={group?.title} />
        <SelectField
          label="Tone"
          name="tone"
          required
          defaultValue={group?.tone ?? "pacific"}
          options={TONES}
        />
      </div>
      <TextField
        label="Items"
        name="items"
        required
        defaultValue={group?.items?.join("\n") ?? ""}
        rows={6}
        hint="One item per line."
      />
      <Field
        label="Sort order"
        name="sort_order"
        type="number"
        defaultValue={String(group?.sort_order ?? 0)}
      />
      <div className="pt-2">
        <SubmitButton>{submitLabel}</SubmitButton>
      </div>
    </form>
  );
}
