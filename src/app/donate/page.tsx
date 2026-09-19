"use client";

import { useState } from "react";
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
  HelpCircle,
  Copy,
  Check,
} from "lucide-react";
import { supportOptions, paymentDisclosure, relationshipDisclosure } from "@/config/ecosystem";

function newCheckoutKey() {
  return crypto.randomUUID();
}

export default function DonatePage() {
  const [selectedOptionId, setSelectedOptionId] = useState<string>("guardian-monthly");
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
      setStatus({ kind: "error", message: "Please enter your full name." });
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

      // Immediately navigate to PayPro's secure checkout page
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
    <div className="min-h-screen bg-brand-gray-50/50 selection:bg-brand-nero selection:text-white pt-8 pb-24">
      {/* Top Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-nero/10 border border-brand-nero/20 text-brand-nero text-xs font-black uppercase tracking-wider mb-4">
          <Sparkles size={14} className="animate-pulse" />
          Verified Secure Donation
        </div>
        <h1 className="text-3xl sm:text-5xl font-[900] tracking-tight text-brand-charcoal leading-[1.1]">
          Support Hammad Foundation School
        </h1>
        <p className="mt-4 text-base sm:text-lg text-brand-charcoal/70 font-medium max-w-2xl leading-relaxed">
          {relationshipDisclosure} Every rupee directly funds the free education, uniforms, and books of our 180+ enrolled students.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Checkout Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-brand-charcoal/10 p-6 sm:p-10 shadow-xl">
            <form onSubmit={handleDonate} className="space-y-8">
              {/* Step 1: Support Tier */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-brand-charcoal/60 mb-3">
                  1. Choose Sponsorship Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {supportOptions.map((opt) => {
                    const selected = selectedOptionId === opt.id;
                    const amount = opt.amountPkr;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setSelectedOptionId(opt.id);
                            resetCheckout();
                          }}
                          className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                            selected
                              ? "border-brand-nero bg-brand-nero/[0.04] shadow-sm"
                              : "border-brand-charcoal/10 hover:border-brand-charcoal/25 bg-white"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <p className="text-sm font-bold text-brand-charcoal">{opt.label}</p>
                            <span
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                selected ? "border-brand-nero bg-brand-nero text-white" : "border-brand-charcoal/30"
                              }`}
                            >
                              {selected && <Check size={10} className="stroke-[3]" />}
                            </span>
                          </div>
                          <p className="text-xs text-brand-charcoal/60 mb-2">{opt.description}</p>
                          <p className="text-base font-black text-brand-nero">
                            PKR {amount.toLocaleString()}{" "}
                            <span className="text-[10px] text-brand-charcoal/50 font-normal">
                              {opt.recurring ? "/ month" : "one-time"}
                            </span>
                          </p>
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
                    className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedOptionId === "custom"
                        ? "border-brand-nero bg-brand-nero/[0.04] shadow-sm"
                        : "border-brand-charcoal/10 hover:border-brand-charcoal/25 bg-white"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-bold text-brand-charcoal">Custom Amount</p>
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedOptionId === "custom"
                            ? "border-brand-nero bg-brand-nero text-white"
                            : "border-brand-charcoal/30"
                        }`}
                      >
                        {selectedOptionId === "custom" && <Check size={10} className="stroke-[3]" />}
                      </span>
                    </div>
                    <p className="text-xs text-brand-charcoal/60 mb-2">Give whatever you can afford</p>
                    <p className="text-base font-black text-brand-charcoal">PKR 100 - 5,000,000</p>
                  </button>
                </div>

                {/* Custom Amount Input */}
                {selectedOptionId === "custom" && (
                  <div className="mt-4 p-4 rounded-2xl bg-brand-gray-50 border border-brand-charcoal/10">
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/60 mb-2">
                      Enter Amount in PKR
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-charcoal/50">
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
                        className="w-full bg-white border border-brand-charcoal/20 rounded-xl pl-16 pr-4 py-3 text-lg font-black text-brand-charcoal outline-none focus:border-brand-nero focus:ring-2 focus:ring-brand-nero/20"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Step 2: Donor Details */}
              <div className="space-y-4">
                <label className="block text-xs font-black uppercase tracking-wider text-brand-charcoal/60">
                  2. Your Details
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
                    className="w-full bg-brand-gray-50/50 border border-brand-charcoal/15 rounded-xl px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-nero focus:ring-2 focus:ring-brand-nero/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal/80 mb-1.5">
                      Email Address <span className="text-brand-charcoal/40 font-normal">(for receipt)</span>
                    </label>
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => {
                        setDonorEmail(e.target.value);
                        resetCheckout();
                      }}
                      placeholder="donor@example.com"
                      className="w-full bg-brand-gray-50/50 border border-brand-charcoal/15 rounded-xl px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-nero focus:ring-2 focus:ring-brand-nero/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal/80 mb-1.5">
                      Phone / WhatsApp <span className="text-brand-charcoal/40 font-normal">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={donorPhone}
                      onChange={(e) => {
                        setDonorPhone(e.target.value);
                        resetCheckout();
                      }}
                      placeholder="+92 300 1234567"
                      className="w-full bg-brand-gray-50/50 border border-brand-charcoal/15 rounded-xl px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-nero focus:ring-2 focus:ring-brand-nero/20"
                    />
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {status.kind === "error" && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{status.message}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div>
                <button
                  type="submit"
                  disabled={status.kind === "loading" || currentAmount <= 0}
                  className="w-full py-4 px-8 rounded-2xl bg-brand-nero hover:bg-brand-nero/90 text-white font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-brand-nero/25 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {status.kind === "loading" ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Initializing PayPro Gateway...
                    </>
                  ) : (
                    <>
                      Proceed to PayPro Checkout (PKR {currentAmount.toLocaleString()}) &rarr;
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-brand-charcoal/60 font-semibold">
                  <Lock size={12} className="text-brand-nero" />
                  <span>Encrypted 256-bit TLS connection. Visa, MasterCard &amp; PayPro Supported.</span>
                </div>
              </div>
            </form>
          </div>

          {/* Right Sidebar: Trust, Entity Disclosure & Bank Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Entity Badge */}
            <div className="bg-[#151920] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-nero mb-3">
                <Building2 size={16} />
                <span>Operating Entity</span>
              </div>
              <h2 className="text-xl font-[900] tracking-tight">{paymentDisclosure.recipientPublicName}</h2>
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                {paymentDisclosure.statement} Hammad Foundation is the designated education project.
              </p>

              <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-white/80 font-medium">
                  <CheckCircle2 size={16} className="text-brand-nero shrink-0" />
                  <span>Official PayPro V2 Licensed Gateway</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 font-medium">
                  <CheckCircle2 size={16} className="text-brand-nero shrink-0" />
                  <span>Instant SMS &amp; Email Confirmation</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 font-medium">
                  <CheckCircle2 size={16} className="text-brand-nero shrink-0" />
                  <span>100% Tax-exempt Education Project</span>
                </div>
              </div>
            </div>

            {/* Bank Transfer Card */}
            <div className="bg-white rounded-3xl border border-brand-charcoal/10 p-6 sm:p-8 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-charcoal/60">
                  <CreditCard size={16} className="text-brand-nero" />
                  <span>Offline Bank Transfer</span>
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

              <p className="text-xs text-brand-charcoal/70 mb-4">
                Prefer direct banking? Transfer to our verified school bank account:
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
