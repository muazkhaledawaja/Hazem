import Link from "next/link";
import { palette as P } from "@/lib/constants";
import Glass from "@/components/ui/Glass";
import PageHeader from "@/components/admin/PageHeader";
import DeleteForm from "@/components/admin/DeleteForm";
import { getProjects } from "@/lib/data";
import { deleteProject } from "./actions";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        label="Portfolio"
        title="Credentials"
        subtitle="Certificates and internships shown in the public Work section."
        action={{ href: "/admin/projects/new", label: "New entry" }}
      />

      {projects.length === 0 ? (
        <Glass className="p-8 text-center">
          <p className="text-sm" style={{ color: P.muted }}>
            No entries yet. Add your first certificate or internship.
          </p>
        </Glass>
      ) : (
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <Glass key={project.id} className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {project.image_url ? (
                  <div
                    className="w-16 h-16 rounded-xl shrink-0 overflow-hidden"
                    style={{ border: `1px solid ${project.accent}40` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="w-16 h-16 rounded-xl shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${project.accent}, ${P.deep})`,
                      border: `1px solid ${project.accent}40`,
                    }}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-[0.15em]"
                      style={{
                        background: `${project.accent}12`,
                        color: project.accent,
                        border: `1px solid ${project.accent}25`,
                      }}
                    >
                      {project.category}
                    </span>
                    <span
                      className="text-[10px]"
                      style={{ color: P.muted }}
                    >
                      #{project.sort_order}
                    </span>
                  </div>
                  <h3
                    className="font-heading text-base truncate"
                    style={{ color: P.pale, fontWeight: 600 }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-xs mt-1 line-clamp-2"
                    style={{ color: P.text, fontWeight: 300 }}
                  >
                    {project.description}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="px-4 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold"
                    style={{
                      background: "transparent",
                      color: P.text,
                      border: `1px solid ${P.border}`,
                    }}
                  >
                    Edit
                  </Link>
                  <DeleteForm action={deleteProject} id={project.id} />
                </div>
              </div>
            </Glass>
          ))}
        </div>
      )}
    </>
  );
}
