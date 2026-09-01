import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";
import { contact } from "@/config/ecosystem";
export const metadata: Metadata = { title: "Refunds", alternates: { canonical: "/refunds" } };
export default function Page() { return <ContentPage eyebrow="Policy · Updated 28 August 2026" title="Refunds and cancellations" intro="Online payment is not currently enabled, so this site cannot create, cancel, or refund a transaction."><h2>When payment becomes available</h2><p>The YZ checkout must state the payment provider, recurrence, cancellation route, refund terms, recipient, and Hammad project designation before a visitor pays.</p><h2>Existing transfer question</h2><p>Contact <a href={`mailto:${contact.email}`}>{contact.email}</a> with the transaction date, amount, sender, and YZ reference if available. Do not send card credentials or passwords.</p></ContentPage>; }
