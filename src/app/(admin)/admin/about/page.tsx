import { palette as P } from "@/lib/constants";
import Glass from "@/components/ui/Glass";
import PageHeader from "@/components/admin/PageHeader";
import { Field, TextField } from "@/components/admin/Field";
import SubmitButton from "@/components/admin/SubmitButton";
import { getAbout } from "@/lib/data";
import { updateAbout } from "./actions";

export default async function AboutPage() {
  const about = await getAbout();
  const stats = about?.stats?.length
    ? about.stats
    : [
        { value: "", label: "" },
        { value: "", label: "" },
        { value: "", label: "" },
      ];

  return (
    <>
      <PageHeader
        label="About"
        title="About section"
        subtitle="Bio, badge, and the three stats shown next to your photo."
      />

      <Glass className="p-6 sm:p-8">
        <form action={updateAbout} className="flex flex-col gap-5">
          <TextField
            label="Primary bio"
            name="bioPrimary"
            required
            defaultValue={about?.bioPrimary}
            rows={4}
          />
          <TextField
            label="Secondary bio"
            name="bioSecondary"
            required
            defaultValue={about?.bioSecondary}
            rows={3}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              label="Badge top"
              name="badgeTop"
              defaultValue={about?.badgeTop}
              hint="Small uppercase label on the photo badge."
            />
            <Field
              label="Badge bottom"
              name="badgeBottom"
              defaultValue={about?.badgeBottom}
              hint="Main badge text."
            />
          </div>

          <div>
            <p
              className="text-[10px] uppercase tracking-[0.2em] mb-3"
              style={{ color: P.muted, fontWeight: 500 }}
            >
              Stats (exactly 3 shown)
            </p>
            <div className="flex flex-col gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="grid grid-cols-[1fr_2fr] gap-3">
                  <input
                    name="stat_value"
                    defaultValue={stats[i]?.value ?? ""}
                    placeholder="3+"
                    className="px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: "rgba(27,73,101,0.15)",
                      border: `1px solid ${P.border}`,
                      color: P.pale,
                    }}
                  />
                  <input
                    name="stat_label"
                    defaultValue={stats[i]?.label ?? ""}
                    placeholder="Projects"
                    className="px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: "rgba(27,73,101,0.15)",
                      border: `1px solid ${P.border}`,
                      color: P.pale,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <SubmitButton>Save about</SubmitButton>
          </div>
        </form>
      </Glass>
    </>
  );
}
