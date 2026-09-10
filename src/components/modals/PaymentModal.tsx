"use client";

import { useState } from "react";
import { ArrowRight, Loader2, ShieldCheck, X } from "lucide-react";
import {
  buildYzDonationUrl,
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
  const [selectedId, setSelectedId] = useState<SupportOptionId>(
    initialOption?.id || "guardian-monthly",
  );
  const [redirecting, setRedirecting] = useState(false);

  if (!isOpen) return null;

  function handleContinue() {
    if (redirecting) return;
    setRedirecting(true);
    window.location.assign(buildYzDonationUrl(selectedId));
  }

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !redirecting) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="support-dialog-title"
        className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-8"
      >
        <div className="flex items-start justify-between gap-4 border-b border-brand-charcoal/10 pb-5">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-brand-nero">
              Official support route
            </p>
            <h2
              id="support-dialog-title"
              className="mt-1 text-2xl font-black text-brand-charcoal md:text-3xl"
            >
              Hammad Foundation Support
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={redirecting}
            aria-label="Close support dialog"
            className="rounded-full bg-brand-gray-50 p-2 text-brand-charcoal/60 hover:bg-brand-gray-100 hover:text-brand-charcoal disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-brand-nero/20 bg-brand-nero/5 p-4 text-xs leading-relaxed text-brand-charcoal/80">
          <p className="mb-1 flex items-center gap-1.5 font-bold text-brand-nero">
            <ShieldCheck size={16} /> Transparent payment notice
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

        {redirecting ? (
          <div className="my-8 flex flex-col items-center justify-center py-6 text-center">
            <Loader2 className="animate-spin text-brand-nero" size={48} />
            <h3 className="mt-4 text-xl font-black text-brand-charcoal">
              Opening the YZ support page…
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-brand-charcoal/60">
              YZ Educational Services will show the recipient and Hammad Foundation
              designation again before any payment begins.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-5">
            <fieldset>
              <legend className="text-xs font-black uppercase tracking-wider text-brand-charcoal/60">
                Select support designation
              </legend>
              <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
                {supportOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer flex-col rounded-xl border p-3 text-left transition-all ${
                      selectedId === option.id
                        ? "border-brand-nero bg-brand-nero/10 text-brand-charcoal ring-2 ring-brand-nero"
                        : "border-brand-charcoal/10 bg-white hover:border-brand-charcoal/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="support-designation"
                      value={option.id}
                      checked={selectedId === option.id}
                      onChange={() => setSelectedId(option.id)}
                      className="sr-only"
                    />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-charcoal/50">
                      {option.recurring ? "Monthly" : "One-time"}
                    </span>
                    <span className="mt-1 text-sm font-black">{option.label}</span>
                    <span className="mt-2 text-lg font-black text-brand-nero">
                      PKR {option.amountPkr.toLocaleString()}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="rounded-2xl border border-brand-charcoal/10 bg-brand-gray-50 p-4 text-sm leading-relaxed text-brand-charcoal/70">
              Your selected option will be carried to the YZ support page. Hammad
              Foundation does not collect payment details or confirm payment status
              on this site.
            </div>

            <button
              type="button"
              onClick={handleContinue}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-nero px-6 py-4 text-base font-black text-white shadow-lg transition-all hover:bg-brand-nero/90 active:scale-[0.99]"
            >
              Continue to secure YZ support page <ArrowRight size={18} />
            </button>
            <p className="text-center text-[11px] leading-relaxed text-brand-charcoal/50">
              Payment is only recorded after approved provider verification by YZ
              Educational Services.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
