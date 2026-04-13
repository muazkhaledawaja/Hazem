import Link from "next/link";
import { palette as P } from "@/lib/constants";
import Glass from "@/components/ui/Glass";
import PageHeader from "@/components/admin/PageHeader";
import {
  getAbout,
  getContact,
  getExperience,
  getProjects,
  getSkillGroups,
  getVideos,
} from "@/lib/data";

export default async function AdminOverviewPage() {
  const [projects, experience, videos, skillGroups, about, contact] = await Promise.all([
    getProjects(),
    getExperience(),
    getVideos(),
    getSkillGroups(),
    getAbout(),
    getContact(),
  ]);

  const cards = [
    { href: "/admin/projects", label: "Projects", count: projects.length },
    { href: "/admin/experience", label: "Experience", count: experience.length },
    { href: "/admin/videos", label: "Videos", count: videos.length },
    { href: "/admin/skills", label: "Skill groups", count: skillGroups.length },
    { href: "/admin/about", label: "About", count: about ? "Set" : "Empty" },
    { href: "/admin/contact", label: "Contact", count: contact ? "Set" : "Empty" },
  ];

  return (
    <>
      <PageHeader
        label="Overview"
        title="Dashboard"
        subtitle="Manage the live portfolio content. Changes publish instantly."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => (
          <Link key={card.href} href={card.href}>
            <Glass className="p-6" glow>
              <p
                className="text-[10px] uppercase tracking-[0.2em] mb-3"
                style={{ color: P.muted, fontWeight: 500 }}
              >
                {card.label}
              </p>
              <p
                className="font-heading text-3xl"
                style={{
                  background: `linear-gradient(135deg, ${P.pacific}, ${P.frozen})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                }}
              >
                {card.count}
              </p>
            </Glass>
          </Link>
        ))}
      </div>
    </>
  );
}
