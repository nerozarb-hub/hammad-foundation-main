import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";
import { contact, paymentDisclosure, relationshipDisclosure } from "@/config/ecosystem";

export const metadata: Metadata = { title: "Privacy", alternates: { canonical: "/privacy" } };

export default function Page() {
  return (
    <ContentPage
      eyebrow="Policy · Updated 28 August 2026"
      title="Privacy"
      intro="Hammad Foundation publishes mission information while limiting personal-data collection."
    >
      <h2>Current site behavior</h2>
      <p>
        {relationshipDisclosure} This site does not collect card or bank credentials and does not confirm payments. Support links transfer donors to the YZ payment experience, where {paymentDisclosure.recipientPublicName} shows the recipient and project designation before payment. External links to WhatsApp or payment providers operate under their respective privacy policies.
      </p>
      <h2>Data handling and safeguarding</h2>
      <p>
        Contact information, student stories, analytics, or future payment features must document what they collect, why, where it is stored, who can access it, and how long it is retained. Student media requires an appropriate consent and safeguarding process.
      </p>
      <h2>Requests</h2>
      <p>Privacy questions may be sent to <a href={`mailto:${contact.email}`}>{contact.email}</a>.</p>
    </ContentPage>
  );
}
