import { Field, TextField } from "@/components/admin/Field";
import SubmitButton from "@/components/admin/SubmitButton";
import type { ExperienceRow } from "@/lib/supabase/types";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  item?: ExperienceRow;
  submitLabel?: string;
};

export default function ExperienceForm({ action, item, submitLabel = "Save" }: Props) {
  return (
    <form action={action} className="flex flex-col gap-5">
      {item && <input type="hidden" name="id" value={item.id} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Role" name="role" required defaultValue={item?.role} />
        <Field label="Company" name="company" required defaultValue={item?.company} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Period"
          name="period"
          required
          defaultValue={item?.period}
          placeholder="e.g. Oct 2025 – Feb 2026"
        />
        <Field
          label="Sort order"
          name="sort_order"
          type="number"
          defaultValue={String(item?.sort_order ?? 0)}
          hint="Lower numbers appear first."
        />
      </div>
      <TextField
        label="Description"
        name="description"
        required
        defaultValue={item?.description}
        rows={4}
      />
      <div className="pt-2">
        <SubmitButton>{submitLabel}</SubmitButton>
      </div>
    </form>
  );
}
