"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, Copy } from "lucide-react";
import { supportOptions, paymentDisclosure } from "@/config/ecosystem";

const amountText = (amount: number) => `PKR ${amount.toLocaleString()}`;
const newCheckoutKey = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

function DonateContent() {
  const params = useSearchParams();
  const initial = params.get("support") || "guardian-monthly";
  const [selected, setSelected] = useState(supportOptions.some(option => option.id === initial) || initial === "custom" ? initial : "guardian-monthly");
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [key, setKey] = useState(newCheckoutKey);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [fieldError, setFieldError] = useState<"name" | "amount" | "email" | "phone" | "">("");
  const option = supportOptions.find(item => item.id === selected);
  const amount = selected === "custom" ? Number(customAmount) || 0 : option?.amountPkr || 0;
  const isMonthly = option?.recurring || false;

  function reset() { setKey(newCheckoutKey()); setError(""); setFieldError(""); }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2 || name.trim().length > 100) { setFieldError("name"); setError("Enter a full name of 2–100 characters."); return; }
    if (!Number.isInteger(amount) || amount < 100 || amount > 5000000) { setFieldError("amount"); setError("Enter an amount between PKR 100 and PKR 5,000,000."); return; }
    if (email.trim() && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || email.trim().length > 120)) { setFieldError("email"); setError("Enter a valid email address or leave it blank."); return; }
    if (phone.trim() && !/^\+?[0-9]{7,16}$/.test(phone.trim().replace(/[\s\-()]/g, ""))) { setFieldError("phone"); setError("Enter a valid phone number or leave it blank."); return; }
    setFieldError(""); setError(""); setLoading(true);
    try {
      const response = await fetch("/api/paypro/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": key },
        body: JSON.stringify({
          amount,
          donorName: name.trim(),
          donorEmail: email.trim() || undefined,
          donorPhone: phone.trim() || undefined,
          supportOptionId: selected,
        }),
      });
      const result = await response.json();
      const checkoutUrl = result.click2PayUrl || result.checkoutUrl;
      if (!response.ok || !result.success || !checkoutUrl) {
        setKey(newCheckoutKey());
        setError(result.error || "Payment could not be started. Please try again.");
        return;
      }
      window.location.assign(checkoutUrl);
    } catch {
      setKey(newCheckoutKey());
      setError("The payment service could not be reached. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  async function copyBank() {
    try { await navigator.clipboard.writeText("Bank: Meezan Bank Ltd\nAccount Title: YZ Educational Services\nIBAN: PK28MEZN0001234567890123\nBranch: Barki Road, Lahore"); setCopied(true); }
    catch { setError("Bank details could not be copied. You can select and copy the IBAN below."); }
  }

  return <div className="bg-brand-sand py-12 md:py-20"><div className="container max-w-6xl">
    <p className="text-sm font-bold uppercase tracking-widest text-brand-nero">Secure support</p>
    <h1 className="mt-4 max-w-[18ch]">Support education through Hammad Foundation</h1>
    <p className="mt-5 max-w-[55ch] text-lg text-secondary">Choose a support designation, provide the details needed for the payment record, and continue to hosted PayPro checkout.</p>
    <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
      <form onSubmit={submit} noValidate className="rounded-2xl border border-brand-charcoal/15 bg-white p-5 sm:p-8 lg:col-span-7">
        <fieldset><legend className="text-2xl font-bold">1. Choose support</legend><p className="mt-2 text-base text-secondary">Select the amount and designation you would like to review.</p>
          <div className="mt-5 space-y-3">{[...supportOptions].sort((a,b) => Number(b.recurring)-Number(a.recurring)).map(item => <label key={item.id} className={`flex min-h-20 cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-colors hover:border-brand-nero ${selected === item.id ? "border-brand-nero bg-[#E9F8ED]" : "border-brand-charcoal/20"}`}><input type="radio" name="support" value={item.id} checked={selected === item.id} onChange={() => { setSelected(item.id); reset(); }} className="mt-1 h-5 w-5 accent-[#087E3B]" /><span className="block min-w-0"><strong className="block text-xl tabular-nums">{amountText(item.amountPkr)} <span className="text-base font-normal">{item.recurring ? "/ month designation" : "one-time"}</span></strong><span className="block font-bold">{item.label}</span><span className="mt-1 block text-base text-secondary">{item.description}</span></span></label>)}
          <label className={`flex min-h-16 cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-colors hover:border-brand-nero ${selected === "custom" ? "border-brand-nero bg-[#E9F8ED]" : "border-brand-charcoal/20"}`}><input type="radio" name="support" value="custom" checked={selected === "custom"} onChange={() => { setSelected("custom"); reset(); }} className="mt-1 h-5 w-5 accent-[#087E3B]" /><span><strong className="block text-xl">Custom amount</strong><span className="text-base text-secondary">One-time · Hammad Foundation · PKR 100–5,000,000</span></span></label>
          {selected === "custom" && <div className="border border-brand-charcoal/20 bg-[#FFFEFA] p-4"><label htmlFor="custom-amount" className="block text-base font-bold">Amount in PKR</label><input id="custom-amount" type="number" min="100" max="5000000" step="1" value={customAmount} onChange={event => { setCustomAmount(event.target.value); reset(); }} aria-invalid={fieldError === "amount"} aria-describedby={fieldError === "amount" ? "amount-error" : undefined} className="mt-2 min-h-12 w-full rounded-xl border border-brand-charcoal/30 px-4 text-base" />{fieldError === "amount" && <p id="amount-error" className="mt-2 text-base text-brand-rust">Enter a whole amount between PKR 100 and PKR 5,000,000.</p>}</div>}</div>
          {isMonthly && <p className="mt-4 border-l-2 border-brand-nero pl-3 text-base text-secondary">This PayPro checkout creates one payment for the monthly Guardian designation. It does not set up an automatic recurring charge.</p>}
        </fieldset>
        <fieldset className="mt-9 border-t border-brand-charcoal/15 pt-8"><legend className="text-2xl font-bold">2. Your details</legend><p className="mt-2 text-base text-secondary">Your name is required for the payment record. Contact details are optional.</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2"><div className="sm:col-span-2"><label htmlFor="donor-name" className="block text-base font-bold">Full name <span aria-hidden="true">*</span></label><input id="donor-name" autoComplete="name" value={name} onChange={event => { setName(event.target.value); reset(); }} required aria-invalid={fieldError === "name"} aria-describedby={fieldError === "name" ? "name-error" : undefined} className="mt-2 min-h-12 w-full rounded-xl border border-brand-charcoal/30 px-4 text-base" />{fieldError === "name" && <p id="name-error" className="mt-2 text-base text-brand-rust">Enter a full name of 2–100 characters.</p>}</div>
          <div><label htmlFor="donor-email" className="block text-base font-bold">Email <span className="font-normal text-secondary">(optional)</span></label><input id="donor-email" type="email" autoComplete="email" value={email} onChange={event => { setEmail(event.target.value); reset(); }} aria-invalid={fieldError === "email"} aria-describedby={fieldError === "email" ? "email-error" : undefined} className="mt-2 min-h-12 w-full rounded-xl border border-brand-charcoal/30 px-4 text-base" /><p className="mt-1 text-sm text-secondary">For your payment receipt.</p>{fieldError === "email" && <p id="email-error" className="mt-2 text-base text-brand-rust">Enter a valid email address or leave it blank.</p>}</div>
          <div><label htmlFor="donor-phone" className="block text-base font-bold">Phone or WhatsApp <span className="font-normal text-secondary">(optional)</span></label><input id="donor-phone" type="tel" autoComplete="tel" value={phone} onChange={event => { setPhone(event.target.value); reset(); }} aria-invalid={fieldError === "phone"} aria-describedby={fieldError === "phone" ? "phone-error" : undefined} className="mt-2 min-h-12 w-full rounded-xl border border-brand-charcoal/30 px-4 text-base" /><p className="mt-1 text-sm text-secondary">For questions about your support.</p>{fieldError === "phone" && <p id="phone-error" className="mt-2 text-base text-brand-rust">Enter a valid phone number or leave it blank.</p>}</div></div>
        </fieldset>
        <section aria-labelledby="review-heading" className="mt-9 border-t border-brand-charcoal/15 pt-8"><h2 id="review-heading" className="!font-sans !text-2xl !font-bold !tracking-normal">3. Review and continue</h2><p className="mt-2 text-base text-secondary">PayPro hosts the next payment step.</p>
          <dl className="support-summary mt-5 divide-y divide-brand-charcoal/15 border-y border-brand-charcoal/15 lg:hidden"><div className="grid gap-1 py-3 sm:flex sm:justify-between sm:gap-3"><dt>Amount</dt><dd className="font-bold tabular-nums">{amountText(amount)}</dd></div><div className="grid gap-1 py-3 sm:flex sm:justify-between sm:gap-3"><dt>Frequency</dt><dd>{isMonthly ? "Monthly designation · one payment" : "One-time"}</dd></div><div className="grid gap-1 py-3 sm:flex sm:justify-between sm:gap-3"><dt>Recipient</dt><dd className="font-bold sm:text-right">{paymentDisclosure.recipientPublicName}</dd></div><div className="grid gap-1 py-3 sm:flex sm:justify-between sm:gap-3"><dt>Designation</dt><dd>{paymentDisclosure.designation}</dd></div></dl>
          <div aria-live="polite" role="status" className={`mt-5 min-h-6 text-base ${error ? "text-brand-rust" : "text-secondary"}`}>{error || (loading ? "Connecting to PayPro. Please wait." : "")}</div>
          <button type="submit" disabled={loading} className="btn-brand mt-3 w-full disabled:cursor-not-allowed disabled:opacity-50">{loading ? "Connecting to PayPro…" : selected === "custom" && !amount ? "Enter an amount to continue" : `Continue with ${amountText(amount)}`} {!loading && <ArrowRight size={18} aria-hidden="true" />}</button>
        </section>
      </form>
      <aside className="space-y-6 lg:sticky lg:top-24 lg:col-span-5"><section className="hidden rounded-2xl lg:block border border-brand-charcoal/15 bg-white p-6 sm:p-8"><h2 className="!font-sans !text-2xl !font-bold !tracking-normal">Your support summary</h2><dl className="support-summary mt-5 divide-y divide-brand-charcoal/15 border-y border-brand-charcoal/15"><div className="grid gap-1 py-3 sm:flex sm:justify-between sm:gap-3"><dt>Amount</dt><dd className="font-bold tabular-nums">{amountText(amount)}</dd></div><div className="grid gap-1 py-3 sm:flex sm:justify-between sm:gap-3"><dt>Frequency</dt><dd className="sm:text-right">{isMonthly ? "Monthly designation · one payment" : "One-time"}</dd></div><div className="grid gap-1 py-3 sm:flex sm:justify-between sm:gap-3"><dt>Recipient</dt><dd className="font-bold sm:text-right">{paymentDisclosure.recipientPublicName}</dd></div><div className="grid gap-1 py-3 sm:flex sm:justify-between sm:gap-3"><dt>Designation</dt><dd>{paymentDisclosure.designation}</dd></div><div className="grid gap-1 py-3 sm:flex sm:justify-between sm:gap-3"><dt>Next step</dt><dd>Hosted PayPro checkout</dd></div></dl><p className="mt-5 text-base text-secondary">{paymentDisclosure.statement} <Link href="/transparency" className="text-brand-nero  ">Review the payment relationship</Link>.</p></section>
      <section className="border-t border-brand-charcoal/20 pt-5"><div className="flex items-center justify-between gap-3"><h2 className="!font-sans !text-xl !font-bold !tracking-normal">Direct bank transfer</h2><button type="button" onClick={copyBank} className="btn-outline shrink-0">{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Copied" : "Copy details"}</button></div><p className="mt-2 text-base text-secondary">Supporters in Pakistan can also transfer directly to the account shown below:</p><dl className="mt-4 space-y-2 text-base"><div><dt className="font-bold">Bank</dt><dd>Meezan Bank Ltd</dd></div><div><dt className="font-bold">Account title</dt><dd>YZ Educational Services</dd></div><div><dt className="font-bold">IBAN</dt><dd className="break-all tabular-nums">PK28MEZN0001234567890123</dd></div></dl></section></aside>
    </div>
  </div></div>;
}

export default function DonatePage() { return <Suspense fallback={<div className="container py-20" role="status">Loading support options…</div>}><DonateContent /></Suspense>; }
