"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Loader2,
  Sparkles,
  Building2,
  CreditCard,
  HeartHandshake,
  Check,
  Copy,
  BookOpen,
  Shirt,
  GraduationCap,
} from "lucide-react";
import { supportOptions, paymentDisclosure, relationshipDisclosure } from "@/config/ecosystem";

function newCheckoutKey() {
  return crypto.randomUUID();
}

function DonateContent() {
  const searchParams = useSearchParams();
  const initialSupport = searchParams.get("support") || "guardian-monthly";

  const [selectedOptionId, setSelectedOptionId] = useState<string>(initialSupport);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [checkoutKey, setCheckoutKey] = useState(newCheckoutKey);
  const [copiedBank, setCopiedBank] = useState(false);
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "loading" }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  function resetCheckout() {
    setCheckoutKey(newCheckoutKey());
    setStatus({ kind: "idle" });
  }

  const selectedOption = supportOptions.find((opt) => opt.id === selectedOptionId);
  const isCustom = selectedOptionId === "custom";
  const currentAmount = isCustom
    ? Number(customAmount) || 0
    : selectedOption
    ? selectedOption.amountPkr
    : 0;

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault();

    if (!donorName.trim()) {
      setStatus({ kind: "error", message: "Please enter your full name to proceed." });
      return;
    }

    if (isCustom && (!currentAmount || currentAmount < 100 || currentAmount > 5000000)) {
      setStatus({ kind: "error", message: "Enter a valid amount between PKR 100 and PKR 5,000,000." });
      return;
    }

    setStatus({ kind: "loading" });

    try {
      const response = await fetch("/api/paypro/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": checkoutKey,
        },
        body: JSON.stringify({
          amount: currentAmount,
          donorName: donorName.trim(),
          donorEmail: donorEmail.trim() || undefined,
          donorPhone: donorPhone.trim() || undefined,
          supportOptionId: selectedOptionId,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success || !result.click2PayUrl) {
        setStatus({
          kind: "error",
          message: result.error || "Payment could not be initialized. Please try again.",
        });
        return;
      }

      window.location.assign(result.click2PayUrl);
    } catch {
      setStatus({
        kind: "error",
        message: "Unable to reach payment service. Please try again later.",
      });
    }
  }

  function copyBankDetails() {
    const details = `Bank: Meezan Bank Ltd\nAccount Title: YZ Educational Services\nIBAN: PK28MEZN0001234567890123\nBranch: Barki Road, Lahore`;
    navigator.clipboard.writeText(details);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  }

  return (
    <div className="min-h-screen bg-brand-sand py-12 md:py-20 selection:bg-brand-nero selection:text-white">
      <div className="container max-w-5xl">
        {/* Header Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-nero/10 text-brand-nero text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles size={14} /> Direct Student Sponsorship
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-[900] tracking-tight text-brand-charcoal leading-tight">
            Support Hammad Foundation School
          </h1>
          <p className="mt-4 text-sm sm:text-base text-brand-charcoal/70 font-medium leading-relaxed">
            100% of your contribution directly funds books, uniforms, tuition, and daily meals for students in Barki Road, Lahore.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Donation Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-brand-charcoal/10 p-6 sm:p-10 shadow-xl">
            <form onSubmit={handleDonate} className="space-y-8">
              {/* Step 1: Select Impact Package */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-brand-charcoal/60 mb-3">
                  1. Select Impact Option
                </label>
                <div className="space-y-3">
                  {supportOptions.map((opt) => {
                    const selected = selectedOptionId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setSelectedOptionId(opt.id);
                          resetCheckout();
                        }}
                        className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          selected
                            ? "border-brand-nero bg-brand-nero/[0.04] ring-1 ring-brand-nero shadow-sm"
                            : "border-brand-charcoal/10 hover:border-brand-charcoal/30 bg-white"
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <span
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                              selected ? "border-brand-nero bg-brand-nero text-white" : "border-brand-charcoal/30"
                            }`}
                          >
                            {selected && <Check size={12} className="stroke-[3]" />}
                          </span>
                          <div>
                            <p className="text-sm font-black text-brand-charcoal">{opt.label}</p>
                            <p className="text-xs text-brand-charcoal/60 mt-0.5 leading-relaxed font-medium">
                              {opt.description}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="text-base sm:text-lg font-black text-brand-nero">
                            PKR {opt.amountPkr.toLocaleString()}
                          </p>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-brand-charcoal/50">
                            {opt.recurring ? "Monthly" : "One-time"}
                          </p>
                        </div>
                      </button>
                    );
                  })}

                  {/* Custom Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedOptionId("custom");
                      resetCheckout();
                    }}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      selectedOptionId === "custom"
                        ? "border-brand-nero bg-brand-nero/[0.04] ring-1 ring-brand-nero shadow-sm"
                        : "border-brand-charcoal/10 hover:border-brand-charcoal/30 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                          selectedOptionId === "custom" ? "border-brand-nero bg-brand-nero text-white" : "border-brand-charcoal/30"
                        }`}
                      >
                        {selectedOptionId === "custom" && <Check size={12} className="stroke-[3]" />}
                      </span>
                      <div>
                        <p className="text-sm font-black text-brand-charcoal">Custom Support</p>
                        <p className="text-xs text-brand-charcoal/60 mt-0.5 font-medium">
                          Choose any amount between PKR 100 and PKR 5,000,000
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/60">
                        Custom
                      </span>
                    </div>
                  </button>

                  {/* Custom Input */}
                  {selectedOptionId === "custom" && (
                    <div className="p-4 rounded-2xl bg-brand-gray-50 border border-brand-charcoal/10 mt-3">
                      <label className="block text-xs font-black uppercase tracking-wider text-brand-charcoal/60 mb-2">
                        Enter Custom Amount in PKR
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-brand-charcoal/50">
                          PKR
                        </span>
                        <input
                          type="number"
                          min="100"
                          max="5000000"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            resetCheckout();
                          }}
                          placeholder="e.g. 5000"
                          className="w-full bg-white border border-brand-charcoal/20 rounded-xl pl-16 pr-4 py-3 text-base font-black text-brand-charcoal outline-none focus:border-brand-nero focus:ring-2 focus:ring-brand-nero/20"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 2: Donor Details */}
              <div className="space-y-4 pt-4 border-t border-brand-charcoal/10">
                <label className="block text-xs font-black uppercase tracking-wider text-brand-charcoal/60">
                  2. Your Information
                </label>

                <div>
                  <label className="block text-xs font-bold text-brand-charcoal/80 mb-1.5">
                    Full Name <span className="text-brand-nero">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => {
                      setDonorName(e.target.value);
                      resetCheckout();
                    }}
                    placeholder="e.g. Muhammad Ali"
                    className="w-full bg-brand-gray-50 border border-brand-charcoal/15 rounded-xl px-4 py-3 text-sm text-brand-charcoal font-medium outline-none focus:border-brand-nero focus:ring-2 focus:ring-brand-nero/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal/80 mb-1.5">
                      Email Address <span className="text-brand-charcoal/50 font-normal">(for official receipt)</span>
                    </label>
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => {
                        setDonorEmail(e.target.value);
                        resetCheckout();
                      }}
                      placeholder="you@example.com"
                      className="w-full bg-brand-gray-50 border border-brand-charcoal/15 rounded-xl px-4 py-3 text-sm text-brand-charcoal font-medium outline-none focus:border-brand-nero focus:ring-2 focus:ring-brand-nero/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal/80 mb-1.5">
                      Phone / WhatsApp <span className="text-brand-charcoal/50 font-normal">(for student updates)</span>
                    </label>
                    <input
                      type="tel"
                      value={donorPhone}
                      onChange={(e) => {
                        setDonorPhone(e.target.value);
                        resetCheckout();
                      }}
                      placeholder="+92 300 1234567"
                      className="w-full bg-brand-gray-50 border border-brand-charcoal/15 rounded-xl px-4 py-3 text-sm text-brand-charcoal font-medium outline-none focus:border-brand-nero focus:ring-2 focus:ring-brand-nero/20"
                    />
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {status.kind === "error" && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  ⚠️ {status.message}
                </div>
              )}

              {/* Submit CTA */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={status.kind === "loading" || currentAmount <= 0}
                  className="btn-brand w-full py-4 px-6 text-base font-black rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer shadow-xl"
                >
                  {status.kind === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Connecting to PayPro Gateway...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed to Secure PayPro Checkout (PKR {currentAmount.toLocaleString()})</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-brand-charcoal/60 font-semibold text-center">
                  <Lock size={12} className="text-brand-nero" />
                  <span>256-bit TLS encrypted. PayPro Click2Pay hosted checkout.</span>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Clear Trust Disclosures & Bank Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Trust Card: Recipient & Designation */}
            <div className="bg-brand-charcoal text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-nero mb-3">
                <Building2 size={16} />
                <span>Verified Payment Entity</span>
              </div>
              <h2 className="text-xl font-[900] tracking-tight">{paymentDisclosure.recipientPublicName}</h2>
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                {paymentDisclosure.statement} Hammad Foundation is the named education school project.
              </p>

              <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-white/85 font-medium">
                  <CheckCircle2 size={16} className="text-brand-nero shrink-0" />
                  <span>SECP CUIN 0326364 Licensed Operator</span>
                </div>
                <div className="flex items-center gap-2 text-white/85 font-medium">
                  <CheckCircle2 size={16} className="text-brand-nero shrink-0" />
                  <span>Official PayPro V2 Encrypted Gateway</span>
                </div>
                <div className="flex items-center gap-2 text-white/85 font-medium">
                  <CheckCircle2 size={16} className="text-brand-nero shrink-0" />
                  <span>Verified Database-Backed Receipts</span>
                </div>
              </div>
            </div>

            {/* Offline Bank Transfer Card */}
            <div className="bg-white rounded-3xl border border-brand-charcoal/10 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-charcoal/60">
                  <CreditCard size={16} className="text-brand-nero" />
                  <span>Direct Bank Transfer</span>
                </div>
                <button
                  type="button"
                  onClick={copyBankDetails}
                  className="flex items-center gap-1 text-[11px] font-bold text-brand-nero hover:underline cursor-pointer"
                >
                  {copiedBank ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedBank ? "Copied" : "Copy Info"}</span>
                </button>
              </div>

              <p className="text-xs text-brand-charcoal/70 mb-4 font-medium">
                Supporters in Pakistan can also transfer directly to our school account:
              </p>

              <div className="bg-brand-gray-50 rounded-2xl p-4 text-xs font-mono space-y-2 border border-brand-charcoal/5">
                <div>
                  <span className="text-brand-charcoal/50 block text-[10px] uppercase font-bold">Bank Name</span>
                  <span className="font-bold text-brand-charcoal">Meezan Bank Ltd</span>
                </div>
                <div>
                  <span className="text-brand-charcoal/50 block text-[10px] uppercase font-bold">Account Title</span>
                  <span className="font-bold text-brand-charcoal">YZ Educational Services</span>
                </div>
                <div>
                  <span className="text-brand-charcoal/50 block text-[10px] uppercase font-bold">IBAN</span>
                  <span className="font-bold text-brand-charcoal text-[11px]">PK28MEZN0001234567890123</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-brand-nero" size={40} />
        </div>
      }
    >
      <DonateContent />
    </Suspense>
  );
}
