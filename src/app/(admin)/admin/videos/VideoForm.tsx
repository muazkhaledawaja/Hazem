import { palette as P } from "@/lib/constants";
import { Field, TextField } from "@/components/admin/Field";
import SubmitButton from "@/components/admin/SubmitButton";
import type { Video } from "@/lib/supabase/types";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  video?: Video;
  submitLabel?: string;
};

export default function VideoForm({ action, video, submitLabel = "Save" }: Props) {
  return (
    <form action={action} className="flex flex-col gap-5">
      {video && <input type="hidden" name="id" value={video.id} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Slug"
          name="slug"
          required
          defaultValue={video?.slug}
          hint="Short unique id, e.g. main, v1, vigour-gym."
        />
        <Field
          label="Sort order"
          name="sort_order"
          type="number"
          defaultValue={String(video?.sort_order ?? 0)}
        />
      </div>
      <Field label="Title" name="title" required defaultValue={video?.title} />
      <TextField
        label="Description"
        name="description"
        required
        defaultValue={video?.description}
        rows={3}
      />
      <Field
        label="Embed URL"
        name="embed"
        defaultValue={video?.embed ?? ""}
        hint="YouTube or Vimeo embed URL. Leave blank for 'Coming soon'."
      />
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={video?.featured}
          className="w-4 h-4"
          style={{ accentColor: P.pacific }}
        />
        <span
          className="text-[10px] uppercase tracking-[0.2em]"
          style={{ color: P.muted, fontWeight: 500 }}
        >
          Feature at the top of the Showreel
        </span>
      </label>
      <div className="pt-2">
        <SubmitButton>{submitLabel}</SubmitButton>
      </div>
    </form>
  );
}
