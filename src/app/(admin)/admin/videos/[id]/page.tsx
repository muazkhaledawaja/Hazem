import { notFound } from "next/navigation";
import Glass from "@/components/ui/Glass";
import PageHeader from "@/components/admin/PageHeader";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Video } from "@/lib/supabase/types";
import VideoForm from "../VideoForm";
import { updateVideo } from "../actions";

export default async function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("videos")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  const video = data as Video | null;
  if (!video) notFound();

  return (
    <>
      <PageHeader label="Video Work" title="Edit video" subtitle={video.title} />
      <Glass className="p-6 sm:p-8">
        <VideoForm action={updateVideo} video={video} submitLabel="Save changes" />
      </Glass>
    </>
  );
}
