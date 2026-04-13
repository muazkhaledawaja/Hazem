import Link from "next/link";
import { palette as P } from "@/lib/constants";
import Glass from "@/components/ui/Glass";
import PageHeader from "@/components/admin/PageHeader";
import DeleteForm from "@/components/admin/DeleteForm";
import { getSkillGroups } from "@/lib/data";
import { deleteSkillGroup } from "./actions";

const TONE_COLOR: Record<string, string> = {
  pacific: P.pacific,
  fresh: P.fresh,
  frozen: P.frozen,
};

export default async function SkillsPage() {
  const groups = await getSkillGroups();

  return (
    <>
      <PageHeader
        label="Expertise"
        title="Skill groups"
        subtitle="Cards shown in the Skills & Tools section."
        action={{ href: "/admin/skills/new", label: "New group" }}
      />

      {groups.length === 0 ? (
        <Glass className="p-8 text-center">
          <p className="text-sm" style={{ color: P.muted }}>
            No skill groups yet.
          </p>
        </Glass>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group) => {
            const color = TONE_COLOR[group.tone] ?? P.pacific;
            return (
              <Glass key={group.id} className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: color }}
                      />
                      <h3
                        className="font-heading text-base"
                        style={{ color: P.pale, fontWeight: 600 }}
                      >
                        {group.title}
                      </h3>
                    </div>
                    <p className="text-[10px]" style={{ color: P.muted }}>
                      {group.tone} — #{group.sort_order}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Link
                      href={`/admin/skills/${group.id}`}
                      className="px-4 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold"
                      style={{
                        background: "transparent",
                        color: P.text,
                        border: `1px solid ${P.border}`,
                      }}
                    >
                      Edit
                    </Link>
                    <DeleteForm action={deleteSkillGroup} id={group.id} />
                  </div>
                </div>
                <ul className="flex flex-col gap-1 mt-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs py-1.5"
                      style={{ color: P.text, borderBottom: `1px solid ${P.border}` }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Glass>
            );
          })}
        </div>
      )}
    </>
  );
}
