"use client";

import React, { useState } from "react";
import { ArrowRight, Loader2, ShieldCheck, X } from "lucide-react";
import {
  getSupportOption,
  paymentDisclosure,
  relationshipDisclosure,
  supportOptions,
  type SupportOptionId,
} from "@/config/ecosystem";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  supportId?: SupportOptionId | string;
}

export function PaymentModal({ isOpen, onClose, supportId }: PaymentModalProps) {
  const initialOption = supportId ? getSupportOption(supportId) : supportOptions[2];

  const [selectedId, setSelectedId] = useState<string>(initialOption?.id || "guardian-monthly");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [donorPhone, setDonorPhone] = useState<string>("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [state, setState] = useState<"idle" | "submitting" | "redirecting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (!isOpen) return null;

  const currentOption = getSupportOption(selectedId);
  const effectiveAmount = selectedId === "custom"
    ? Number(customAmount) || 0
    : currentOption?.amountPkr || 9000;

  const formattedPkr = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(effectiveAmount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (state === "submitting" || state === "redirecting") {
      return; // prevent double click / double submission
    }

    const errors: Record<string, string> = {};
    if (!donorName.trim()) {
      errors.donorName = "Please enter your full name.";
    } else if (donorName.trim().length < 2) {
      errors.donorName = "Name must be at least 2 characters.";
    }

    if (selectedId === "custom") {
      const num = Number(customAmount);
      if (!customAmount || isNaN(num) || num < 100) {
        errors.amount = "Minimum donation amount is PKR 100.";
      } else if (num > 5000000) {
        errors.amount = "Maximum donation amount is PKR 5,000,000.";
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setState("submitting");
    setErrorMessage("");

    try {
      const payload = {
        amount: effectiveAmount, donorName: donorName.trim(),
        donorEmail: donorEmail.trim() || undefined, donorPhone: donorPhone.trim() || undefined,
        supportOptionId: selectedId,
      };
      const fingerprint = JSON.stringify(payload);
      const saved = sessionStorage.getItem('hammad-checkout');
      let checkout: { fingerprint: string; key: string } | null = null;
      try { checkout = saved ? JSON.parse(saved) : null; } catch { /* replace malformed local state */ }
      if (!checkout || checkout.fingerprint !== fingerprint) {
        checkout = { fingerprint, key: crypto.randomUUID() };
        sessionStorage.setItem('hammad-checkout', JSON.stringify(checkout));
      }
      const res = await fetch("/api/paypro/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": checkout.key },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success || !data?.click2PayUrl) {
        throw new Error(data?.error || "Unable to initiate payment with PayPro. Please try again.");
      }

      setState("redirecting");

      // Redirect donor to PayPro Click2Pay hosted checkout page
      window.location.assign(data.click2PayUrl);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Payment initialization failed";
      setErrorMessage(msg);
      setState("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && state !== "submitting" && state !== "redirecting") {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="support-dialog-title"
        className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-8"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-brand-charcoal/10 pb-5">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-brand-nero">
              Official Donation Checkout
            </p>
            <h2 id="support-dialog-title" className="mt-1 text-2xl font-black text-brand-charcoal md:text-3xl">
              Hammad Foundation Support
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={state === "submitting" || state === "redirecting"}
            aria-label="Close support dialog"
            className="rounded-full bg-brand-gray-50 p-2 text-brand-charcoal/60 hover:bg-brand-gray-100 hover:text-brand-charcoal disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Operational & Payment Disclosure */}
        <div className="mt-5 rounded-2xl border border-brand-nero/20 bg-brand-nero/5 p-4 text-xs leading-relaxed text-brand-charcoal/80">
          <p className="font-bold text-brand-nero flex items-center gap-1.5 mb-1">
            <ShieldCheck size={16} /> Transparent Governance & Payment Notice
          </p>
          <p className="text-brand-charcoal/70">{relationshipDisclosure}</p>
          <div className="mt-2.5 grid grid-cols-2 gap-2 border-t border-brand-nero/10 pt-2 text-[11px]">
            <div>
              <span className="font-bold text-brand-charcoal/50">Payment recipient:</span>
              <p className="font-bold text-brand-charcoal">{paymentDisclosure.recipient}</p>
            </div>
            <div>
              <span className="font-bold text-brand-charcoal/50">Designated project:</span>
              <p className="font-bold text-brand-charcoal">{paymentDisclosure.designation}</p>
            </div>
          </div>
        </div>

        {/* Redirecting Overlay State */}
        {state === "redirecting" && (
          <div className="my-8 flex flex-col items-center justify-center py-6 text-center">
            <Loader2 className="animate-spin text-brand-nero" size={48} />
            <h3 className="mt-4 text-xl font-black text-brand-charcoal">
              Redirecting to PayPro Click2Pay...
            </h3>
            <p className="mt-2 text-sm text-brand-charcoal/60">
              Please wait while we transfer you securely to PayPro&apos;s hosted payment page.
            </p>
          </div>
        )}

        {/* Form Body */}
        {state !== "redirecting" && (
          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            {/* Support Tier Selection */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-brand-charcoal/60">
                1. Select Support Designation
              </label>
              <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
                {supportOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(opt.id);
                      setFormErrors((prev) => ({ ...prev, amount: "" }));
                    }}
                    className={`flex flex-col rounded-xl border p-3 text-left transition-all ${
                      selectedId === opt.id
                        ? "border-brand-nero bg-brand-nero/10 text-brand-charcoal ring-2 ring-brand-nero"
                        : "border-brand-charcoal/10 bg-white hover:border-brand-charcoal/30"
                    }`}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-charcoal/50">
                      {opt.recurring ? "Monthly" : "One-time"}
                    </span>
                    <span className="mt-1 text-sm font-black">{opt.label}</span>
                    <span className="mt-2 text-lg font-black text-brand-nero">
                      PKR {opt.amountPkr.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>

              {/* Custom amount toggle */}
              <button
                type="button"
                onClick={() => setSelectedId("custom")}
                className={`mt-2 text-xs font-bold underline underline-offset-2 ${
                  selectedId === "custom" ? "text-brand-nero font-black" : "text-brand-charcoal/60 hover:text-brand-charcoal"
                }`}
              >
                Or enter a custom PKR donation amount
              </button>

              {selectedId === "custom" && (
                <div className="mt-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-brand-charcoal/50">
                      PKR
                    </span>
                    <input
                      type="number"
                      min="100"
                      max="5000000"
                      placeholder="e.g. 5000"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full rounded-xl border border-brand-charcoal/20 py-2.5 pl-14 pr-4 font-bold text-brand-charcoal focus:border-brand-nero focus:outline-none focus:ring-2 focus:ring-brand-nero/20"
                    />
                  </div>
                  {formErrors.amount && (
                    <p className="mt-1 text-xs font-bold text-red-600">{formErrors.amount}</p>
                  )}
                </div>
              )}
            </div>

            {/* Donor Information */}
            <div className="space-y-3">
              <label className="block text-xs font-black uppercase tracking-wider text-brand-charcoal/60">
                2. Donor Information
              </label>

              <div>
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 ${
                    formErrors.donorName
                      ? "border-red-400 focus:ring-red-200"
                      : "border-brand-charcoal/20 focus:border-brand-nero focus:ring-brand-nero/20"
                  }`}
                />
                {formErrors.donorName && (
                  <p className="mt-1 text-xs font-bold text-red-600">{formErrors.donorName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <input
                    type="email"
                    placeholder="Email Address (for receipt)"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full rounded-xl border border-brand-charcoal/20 px-4 py-2.5 text-sm font-medium focus:border-brand-nero focus:outline-none focus:ring-2 focus:ring-brand-nero/20"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Mobile Number (e.g. 03001234567)"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full rounded-xl border border-brand-charcoal/20 px-4 py-2.5 text-sm font-medium focus:border-brand-nero focus:outline-none focus:ring-2 focus:ring-brand-nero/20"
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {state === "error" && errorMessage && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-bold text-red-700">
                {errorMessage}
              </div>
            )}

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={state === "submitting"}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-nero px-6 py-4 text-base font-black text-white shadow-lg transition-all hover:bg-brand-nero/90 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60"
              >
                {state === "submitting" ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Connecting to PayPro...
                  </>
                ) : (
                  <>
                    Proceed to Pay {formattedPkr} via PayPro <ArrowRight size={18} />
                  </>
                )}
              </button>
              <p className="mt-2 text-center text-[11px] text-brand-charcoal/50">
                Secured with 256-bit encryption. Card, 1Link, and mobile banking options available on Click2Pay.
              </p>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

