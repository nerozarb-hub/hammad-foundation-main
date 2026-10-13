import Image from "next/image";

const qr = "/images/yz-jazzcash-raast-qr.png";
const poster = "/images/yz-jazzcash-raast-poster.jpg";
const tillId = "984649286";
const recipient = "Y Z Educational Services Pvt Limited";
const whatsapp = (process.env.NEXT_PUBLIC_DONATION_WHATSAPP || "923008099015").replace(/\D/g, "");
const receipt = `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hello, I made a JazzCash/Raast QR transfer to Y Z Educational Services Pvt Limited for Hammad Foundation. My name: __. Amount (PKR): __. Transaction ID: __. Date: __. Support option: __. I will attach my payment screenshot for review.")}`;

export function JazzCashDonation() {
  return (
    <section id="jazzcash" className="rounded-2xl border border-current/15 bg-white p-6 text-sm leading-relaxed">
      <p className="text-xs font-bold uppercase tracking-widest">Direct QR transfer</p>
      <h2 className="mt-2 text-xl font-bold">Pay with JazzCash or Raast</h2>
      <p className="mt-3">Scan the supplied JazzCash Business / Raast QR in a compatible payment app. The payment recipient is <strong>{recipient}</strong>; designate your support for Hammad Foundation.</p>
      <figure className="mt-5 text-center">
        <Image src={qr} alt="JazzCash and Raast payment QR for Y Z Educational Services Pvt Limited" width={676} height={676} unoptimized className="mx-auto h-auto w-full max-w-[320px] rounded-lg border border-gray-200" />
        <figcaption className="mt-2 text-xs">Check that your app shows {recipient} before approving a transfer.</figcaption>
      </figure>
      <div className="mt-4 flex flex-wrap gap-3"><a href={poster} download="yz-jazzcash-raast-payment.jpg" className="inline-flex min-h-11 items-center rounded-lg border border-current px-4 py-2 font-semibold">Save QR for mobile</a><a href={poster} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-lg border border-current px-4 py-2 font-semibold">Open full payment poster</a></div>
      <p className="mt-4">Using JazzCash without scanning? Dial <strong>*786*10#</strong> and enter TILL ID <strong className="select-all">{tillId}</strong>. Follow the confirmation shown by JazzCash.</p>
      <ol className="mt-5 list-decimal space-y-2 pl-5"><li>Enter the amount in your payment app and verify the recipient name before sending.</li><li>Save the transaction ID and screenshot after your app confirms the transfer.</li><li>Send those details to the team so they can reconcile the payment and confirm receipt.</li></ol>
      <a href={receipt} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-[#166534] px-4 py-2 font-semibold text-white">Send transfer details on WhatsApp</a>
      <p className="mt-3 text-xs">This direct transfer is separate from PayPro checkout. Scanning, sending a screenshot, or opening WhatsApp does not mark a website payment as paid. The team confirms receipt after checking the JazzCash Business account.</p>
    </section>
  );
}
