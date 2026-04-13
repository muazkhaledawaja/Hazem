import { palette as P } from "@/lib/constants";
import Glass from "@/components/ui/Glass";
import PageHeader from "@/components/admin/PageHeader";
import SubmitButton from "@/components/admin/SubmitButton";
import DeleteForm from "@/components/admin/DeleteForm";
import { getCv } from "@/lib/data";
import { uploadCv, deleteCv } from "./actions";

export default async function CvPage() {
  const cv = await getCv();

  return (
    <>
      <PageHeader
        label="CV"
        title="Curriculum Vitae"
        subtitle="Upload a PDF to display a public download card on the homepage. Only one CV is shown at a time."
      />

      {/* Current CV status */}
      {cv ? (
        <Glass className="p-6 sm:p-8 mb-6">
          <p
            className="text-[10px] uppercase tracking-[0.2em] mb-4"
            style={{ color: P.muted, fontWeight: 500 }}
          >
            Current CV
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* PDF icon */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${P.pacific}12`, border: `1px solid ${P.pacific}25` }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={P.pacific} strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: P.pale }}>
                {cv.filename}
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>
                Uploaded{" "}
                {new Date(cv.uploaded_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="flex gap-3 shrink-0">
              <a
                href={cv.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold"
                style={{ background: "transparent", color: P.text, border: `1px solid ${P.border}` }}
              >
                Preview
              </a>

              {/* Delete form */}
              <DeleteForm
                action={deleteCv}
                id="1"
                label="Delete"
                confirmMessage="Remove the current CV? The public download card will disappear."
              />
            </div>
          </div>
        </Glass>
      ) : (
        <Glass className="p-8 text-center mb-6">
          <p className="text-sm" style={{ color: P.muted }}>
            No CV uploaded yet. Add one below.
          </p>
        </Glass>
      )}

      {/* Upload form */}
      <Glass className="p-6 sm:p-8">
        <p
          className="text-[10px] uppercase tracking-[0.2em] mb-5"
          style={{ color: P.muted, fontWeight: 500 }}
        >
          {cv ? "Replace CV" : "Upload CV"}
        </p>
        <form action={uploadCv} className="flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span
              className="text-[10px] uppercase tracking-[0.2em]"
              style={{ color: P.muted, fontWeight: 500 }}
            >
              PDF file <span style={{ color: P.pacific }}>*</span>
            </span>
            <input
              type="file"
              name="cv_file"
              accept="application/pdf"
              required
              className="px-4 py-3 rounded-xl text-sm outline-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:uppercase file:tracking-widest"
              style={{
                background: "rgba(27,73,101,0.15)",
                border: `1px solid ${P.border}`,
                color: P.text,
              }}
            />
            <span className="text-[10px]" style={{ color: P.muted }}>
              PDF only · max 5 MB
            </span>
          </label>
          <div className="pt-1">
            <SubmitButton pendingLabel="Uploading…">
              {cv ? "Replace CV" : "Upload CV"}
            </SubmitButton>
          </div>
        </form>
      </Glass>
    </>
  );
}
