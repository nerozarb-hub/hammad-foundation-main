export const siteUrls = {
  hammad: process.env.NEXT_PUBLIC_HAMMAD_SITE_URL?.replace(/\/$/, "") || "https://hammad.yzeducationalservices.com",
  yz: process.env.NEXT_PUBLIC_YZ_SITE_URL?.replace(/\/$/, "") || "https://yzeducationalservices.com",
} as const;

export const contact = {
  phoneDisplay: "+92 300 8099015",
  phoneE164: "+923008099015",
  email: "info@hammadfoundation.edu.pk",
  location: "Barki Road, Lahore, Pakistan",
} as const;

export const relationshipDisclosure = "Hammad Foundation is a Lahore education initiative supported operationally by YZ Educational Services.";
export const paymentDisclosure = {
  recipient: "Y.Z Educational Services (Private) Limited",
  recipientPublicName: "YZ Educational Services",
  designation: "Hammad Foundation",
  statement: "Approved payment processing and transaction records are handled by YZ Educational Services and designated to Hammad Foundation.",
  gatewayName: "PayPro V2 Hosted Payment Gateway",
} as const;

export const supportOptions = [
  {
    id: "education-support",
    label: "Education support",
    amountMinor: 1500,
    amountPkr: 4500,
    currency: "USD",
    recurring: false,
    description: "A one-time contribution designated to Hammad Foundation for academic books and learning materials.",
  },
  {
    id: "student-essentials",
    label: "Student essentials support",
    amountMinor: 2500,
    amountPkr: 7500,
    currency: "USD",
    recurring: false,
    description: "A one-time contribution designated to Hammad Foundation for school uniforms and essential supplies.",
  },
  {
    id: "guardian-monthly",
    label: "Guardian monthly support",
    amountMinor: 3000,
    amountPkr: 9000,
    currency: "USD",
    recurring: true,
    description: "A monthly contribution designated to Hammad Foundation for tuition, daily meals, and student care.",
  },
] as const;

export type SupportOptionId = (typeof supportOptions)[number]["id"];
export function getSupportOption(id: string) { return supportOptions.find((option) => option.id === id) ?? null; }
export function buildYzDonationUrl(id: string) {
  const option = getSupportOption(id);
  return option ? `${siteUrls.yz}/donate?project=hammad-foundation&support=${encodeURIComponent(option.id)}` : `${siteUrls.yz}/donate?project=hammad-foundation`;
}

