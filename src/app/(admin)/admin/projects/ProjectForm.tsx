import { palette as P } from "@/lib/constants";
import { Field, SelectField, TextField } from "@/components/admin/Field";
import SubmitButton from "@/components/admin/SubmitButton";
import type { Project } from "@/lib/supabase/types";

const CATEGORIES = [
  { value: "Certificates", label: "Certificates" },
  { value: "Internships", label: "Internships" },
];

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  project?: Project;
  submitLabel?: string;
};

export default function ProjectForm({ action, project, submitLabel = "Save" }: Props) {
  return (
    <form action={action} className="flex flex-col gap-5">
      {project && <input type="hidden" name="id" value={project.id} />}
      <Field label="Title" name="title" required defaultValue={project?.title} />
      <SelectField
        label="Category"
        name="category"
        required
        defaultValue={project?.category ?? "Certificates"}
        options={CATEGORIES}
      />
      <TextField
        label="Description"
        name="description"
        required
        defaultValue={project?.description}
        rows={3}
      />

      {/* Image block */}
      <div className="flex flex-col gap-3">
        <span
          className="text-[10px] uppercase tracking-[0.2em]"
          style={{ color: P.muted, fontWeight: 500 }}
        >
          Image
        </span>

        {project?.image_url && (
          <div
            className="rounded-xl overflow-hidden"
            style={{
              border: `1px solid ${P.border}`,
              background: "rgba(27,73,101,0.15)",
              aspectRatio: "16 / 10",
              maxWidth: 320,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <label className="flex flex-col gap-2">
          <span className="text-[10px]" style={{ color: P.muted }}>
            Upload a file (max 5 MB)
          </span>
          <input
            name="image"
            type="file"
            accept="image/*"
            className="text-xs px-3 py-2 rounded-xl"
            style={{
              background: "rgba(27,73,101,0.15)",
              border: `1px solid ${P.border}`,
              color: P.pale,
            }}
          />
        </label>

        <Field
          label="Or paste an image URL"
          name="image_url"
          defaultValue={project?.image_url ?? ""}
          hint="Upload a file OR paste a URL. Upload wins if both are provided. Leave both empty on edit to keep the current image."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Accent color"
          name="accent"
          defaultValue={project?.accent ?? "#62b6cb"}
          hint="Hex color used for the category pill tint."
        />
        <Field
          label="Sort order"
          name="sort_order"
          type="number"
          defaultValue={String(project?.sort_order ?? 0)}
          hint="Lower numbers appear first."
        />
      </div>
      <div className="flex gap-3 pt-2" style={{ borderTop: `1px solid ${P.border}` }}>
        <div className="pt-5">
          <SubmitButton>{submitLabel}</SubmitButton>
        </div>
      </div>
    </form>
  );
}
