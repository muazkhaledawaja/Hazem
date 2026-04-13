import Link from "next/link";
import { palette as P } from "@/lib/constants";
import Glass from "@/components/ui/Glass";
import PageHeader from "@/components/admin/PageHeader";
import DeleteForm from "@/components/admin/DeleteForm";
import { getExperience } from "@/lib/data";
import { deleteExperience } from "./actions";

export default async function ExperienceListPage() {
  const items = await getExperience();

  return (
    <>
      <PageHeader
        label="Journey"
        title="Experience"
        subtitle="Roles and internships shown on the public site."
        action={{ href: "/admin/experience/new", label: "New entry" }}
      />

      {items.length === 0 ? (
        <Glass className="p-8 text-center">
          <p className="text-sm" style={{ color: P.muted }}>
            No experience yet.
          </p>
        </Glass>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <Glass key={item.id} className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[10px] uppercase tracking-[0.2em] mb-1"
                    style={{ color: P.pacific, fontWeight: 500 }}
                  >
                    {item.period} — #{item.sort_order}
                  </p>
                  <h3
                    className="font-heading text-base"
                    style={{ color: P.pale, fontWeight: 600 }}
                  >
                    {item.role}
                  </h3>
                  <p className="text-xs" style={{ color: P.muted }}>
                    {item.company}
                  </p>
                  <p
                    className="text-xs mt-2 line-clamp-2"
                    style={{ color: P.text, fontWeight: 300 }}
                  >
                    {item.description}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link
                    href={`/admin/experience/${item.id}`}
                    className="px-4 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold"
                    style={{
                      background: "transparent",
                      color: P.text,
                      border: `1px solid ${P.border}`,
                    }}
                  >
                    Edit
                  </Link>
                  <DeleteForm action={deleteExperience} id={item.id} />
                </div>
              </div>
            </Glass>
          ))}
        </div>
      )}
    </>
  );
}
