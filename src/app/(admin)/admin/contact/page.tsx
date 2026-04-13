import Glass from "@/components/ui/Glass";
import PageHeader from "@/components/admin/PageHeader";
import { Field, TextField } from "@/components/admin/Field";
import SubmitButton from "@/components/admin/SubmitButton";
import { getContact } from "@/lib/data";
import { updateContact } from "./actions";

export default async function ContactPage() {
  const contact = await getContact();

  return (
    <>
      <PageHeader
        label="Contact"
        title="Contact details"
        subtitle="Shown on the public site and used by the email and LinkedIn buttons."
      />

      <Glass className="p-6 sm:p-8">
        <form action={updateContact} className="flex flex-col gap-5">
          <Field
            label="Email"
            name="email"
            type="email"
            required
            defaultValue={contact?.email}
          />
          <Field
            label="Phone"
            name="phone"
            required
            defaultValue={contact?.phone}
          />
          <Field
            label="LinkedIn URL"
            name="linkedin"
            type="url"
            required
            defaultValue={contact?.linkedin}
          />
          <TextField
            label="Blurb"
            name="blurb"
            required
            defaultValue={contact?.blurb}
            rows={2}
            hint="Short sentence above the contact cards."
          />
          <div className="pt-2">
            <SubmitButton>Save contact</SubmitButton>
          </div>
        </form>
      </Glass>
    </>
  );
}
