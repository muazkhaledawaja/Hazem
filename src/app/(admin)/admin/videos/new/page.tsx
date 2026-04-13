import Glass from "@/components/ui/Glass";
import PageHeader from "@/components/admin/PageHeader";
import VideoForm from "../VideoForm";
import { createVideo } from "../actions";

export default function NewVideoPage() {
  return (
    <>
      <PageHeader label="Video Work" title="New video" />
      <Glass className="p-6 sm:p-8">
        <VideoForm action={createVideo} submitLabel="Create video" />
      </Glass>
    </>
  );
}
