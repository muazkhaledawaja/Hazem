import Link from "next/link";
import { palette as P } from "@/lib/constants";
import Glass from "@/components/ui/Glass";
import PageHeader from "@/components/admin/PageHeader";
import DeleteForm from "@/components/admin/DeleteForm";
import { getVideos } from "@/lib/data";
import { deleteVideo } from "./actions";

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <>
      <PageHeader
        label="Video Work"
        title="Showreel"
        subtitle="Featured and secondary videos."
        action={{ href: "/admin/videos/new", label: "New video" }}
      />

      {videos.length === 0 ? (
        <Glass className="p-8 text-center">
          <p className="text-sm" style={{ color: P.muted }}>
            No videos yet.
          </p>
        </Glass>
      ) : (
        <div className="flex flex-col gap-4">
          {videos.map((video) => (
            <Glass key={video.id} className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {video.featured && (
                      <span
                        className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-[0.15em]"
                        style={{
                          background: `${P.pacific}12`,
                          color: P.pacific,
                          border: `1px solid ${P.pacific}25`,
                        }}
                      >
                        Featured
                      </span>
                    )}
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-[0.15em]"
                      style={{
                        background: video.embed ? `${P.frozen}12` : "rgba(255,200,80,0.08)",
                        color: video.embed ? P.frozen : "#ffd97a",
                        border: `1px solid ${video.embed ? P.frozen : "rgba(255,200,80,0.25)"}25`,
                      }}
                    >
                      {video.embed ? "Live" : "Coming soon"}
                    </span>
                    <span className="text-[10px]" style={{ color: P.muted }}>
                      {video.slug} — #{video.sort_order}
                    </span>
                  </div>
                  <h3
                    className="font-heading text-base"
                    style={{ color: P.pale, fontWeight: 600 }}
                  >
                    {video.title}
                  </h3>
                  <p
                    className="text-xs mt-1 line-clamp-2"
                    style={{ color: P.text, fontWeight: 300 }}
                  >
                    {video.description}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link
                    href={`/admin/videos/${video.id}`}
                    className="px-4 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold"
                    style={{
                      background: "transparent",
                      color: P.text,
                      border: `1px solid ${P.border}`,
                    }}
                  >
                    Edit
                  </Link>
                  <DeleteForm action={deleteVideo} id={video.id} />
                </div>
              </div>
            </Glass>
          ))}
        </div>
      )}
    </>
  );
}
