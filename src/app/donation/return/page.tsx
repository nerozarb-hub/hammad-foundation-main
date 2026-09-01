"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Loader2,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";
import { contact, paymentDisclosure, relationshipDisclosure } from "@/config/ecosystem";
import type { VerifyDonationResult } from "@/lib/paypro/types";

function DonationReturnContent() {
  const searchParams = useSearchParams();

  // PayPro Click2Pay returns `ordId`, `status`, `msg`. Specifically `ordId` contains the PayProID.
  const payProId =
    searchParams.get("ordId") ||
    searchParams.get("payProId") ||
    searchParams.get("cpayId") ||
    searchParams.get("id") ||
    "";
  const orderNumber =
    searchParams.get("orderNumber") ||
    searchParams.get("ord") ||
    "";

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<VerifyDonationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verifyWithBackend = async () => {
    setLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams();
      if (orderNumber) query.set("orderNumber", orderNumber);
      if (payProId) query.set("payProId", payProId);

      const res = await fetch(`/api/paypro/verify?${query.toString()}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || data?.message || "Unable to verify transaction with payment server.");
      }

      setResult(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Verification error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyWithBackend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderNumber, payProId]);

  return (
    <div className="min-h-screen bg-brand-gray-50/50 py-16 px-4 md:py-24">
      <div className="mx-auto max-w-2xl">
        {/* Verification in Progress */}
        {loading && (
          <div className="rounded-3xl border border-brand-charcoal/10 bg-white p-8 text-center shadow-xl md:p-12">
            <Loader2 className="mx-auto animate-spin text-brand-nero" size={56} />
            <h1 className="mt-6 text-2xl font-black text-brand-charcoal md:text-3xl">
              Verifying Payment with PayPro...
            </h1>
            <p className="mt-3 text-sm text-brand-charcoal/60">
              Please wait while our server verifies the transaction authenticity directly with the PayPro payment gateway.
            </p>
          </div>
        )}

        {/* Error / Not Found */}
        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-white p-8 text-center shadow-xl md:p-12">
            <ShieldAlert className="mx-auto text-red-500" size={56} />
            <h1 className="mt-6 text-2xl font-black text-brand-charcoal md:text-3xl">
              Verification Notice
            </h1>
            <p className="mt-3 text-sm text-red-600 font-medium">{error}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={verifyWithBackend}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-charcoal px-6 py-3 font-bold text-white hover:bg-black"
              >
                <RefreshCw size={16} /> Retry Verification
              </button>
              <Link
                href="/#support"
                className="inline-flex items-center justify-center rounded-xl border border-brand-charcoal/20 px-6 py-3 font-bold text-brand-charcoal hover:bg-brand-gray-50"
              >
                Return to Support Page
              </Link>
            </div>
          </div>
        )}

        {/* Payment Confirmed State */}
        {!loading && !error && result && result.status === "paid" && (
          <div className="rounded-3xl border border-brand-nero/20 bg-white p-8 shadow-xl md:p-12">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-brand-nero/10 p-2 text-brand-nero">
                <CheckCircle2 size={36} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-brand-nero">
                  Payment Confirmed
                </p>
                <h1 className="text-2xl font-black text-brand-charcoal md:text-3xl">
                  Thank You for Your Support!
                </h1>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-brand-charcoal/70">
              Your contribution has been verified with PayPro V2. Every rupee is designated directly toward student education, tuition, and daily essentials at Hammad Foundation.
            </p>

            {/* Receipt Summary Card */}
            <div className="mt-6 rounded-2xl bg-brand-gray-50 p-6">
              <h2 className="text-xs font-black uppercase tracking-wider text-brand-charcoal/50">
                Official Transaction Receipt
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between border-b border-brand-charcoal/10 pb-2">
                  <dt className="text-brand-charcoal/60">Amount Paid</dt>
                  <dd className="font-black text-brand-nero text-lg">
                    PKR {result.amount.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-brand-charcoal/10 pb-2">
                  <dt className="text-brand-charcoal/60">Order Number</dt>
                  <dd className="font-mono font-bold text-brand-charcoal">{result.orderNumber}</dd>
                </div>
                {result.payProId && (
                  <div className="flex justify-between border-b border-brand-charcoal/10 pb-2">
                    <dt className="text-brand-charcoal/60">PayPro Invoice ID</dt>
                    <dd className="font-mono font-bold text-brand-charcoal">{result.payProId}</dd>
                  </div>
                )}
                <div className="flex justify-between border-b border-brand-charcoal/10 pb-2">
                  <dt className="text-brand-charcoal/60">Payment Recipient</dt>
                  <dd className="font-bold text-brand-charcoal">{paymentDisclosure.recipient}</dd>
                </div>
                <div className="flex justify-between border-b border-brand-charcoal/10 pb-2">
                  <dt className="text-brand-charcoal/60">Designated Initiative</dt>
                  <dd className="font-bold text-brand-charcoal">{paymentDisclosure.designation}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-brand-charcoal/60">Verification Time</dt>
                  <dd className="font-medium text-brand-charcoal">
                    {result.paidAt ? new Date(result.paidAt).toLocaleString() : new Date().toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Next Steps: WhatsApp & Updates */}
            <div className="mt-8 rounded-2xl border border-brand-charcoal/10 p-5 bg-white">
              <h3 className="font-black text-brand-charcoal">Next Steps for Guardians</h3>
              <p className="mt-2 text-xs leading-relaxed text-brand-charcoal/60">
                If you would like direct WhatsApp photo updates of the school registers and grocery receipts, you can reach out to our team with your Order Number ({result.orderNumber}).
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`https://wa.me/${contact.phoneE164.replace("+", "")}?text=${encodeURIComponent(
                    `Hello, I completed a donation for Hammad Foundation (Order: ${result.orderNumber}, Amount: PKR ${result.amount}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-nero px-6 py-3 font-bold text-white hover:bg-brand-nero/90"
                >
                  Connect on WhatsApp <ExternalLink size={16} />
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-xl border border-brand-charcoal/20 px-6 py-3 font-bold text-brand-charcoal hover:bg-brand-gray-50"
                >
                  Return to Homepage <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Payment Pending State */}
        {!loading && !error && result && result.status === "pending" && (
          <div className="rounded-3xl border border-amber-200 bg-white p-8 shadow-xl md:p-12">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                <Clock size={36} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-amber-600">
                  Payment Pending
                </p>
                <h1 className="text-2xl font-black text-brand-charcoal md:text-3xl">
                  Order Registered
                </h1>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-brand-charcoal/70">
              Your PayPro order has been created and is awaiting settlement. If you chose Bank Transfer, 1Link, or OTC payment, please complete the transfer using your PayPro invoice details.
            </p>

            <div className="mt-6 rounded-2xl bg-brand-gray-50 p-5 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-brand-charcoal/60">Order Number:</span>
                <span className="font-mono font-bold">{result.orderNumber}</span>
              </div>
              {result.payProId && (
                <div className="flex justify-between">
                  <span className="text-brand-charcoal/60">PayPro ID:</span>
                  <span className="font-mono font-bold">{result.payProId}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-brand-charcoal/60">Amount:</span>
                <span className="font-black text-brand-nero">PKR {result.amount.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={verifyWithBackend}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-nero px-6 py-3 font-bold text-white hover:bg-brand-nero/90"
              >
                <RefreshCw size={16} /> Re-check Status
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl border border-brand-charcoal/20 px-6 py-3 font-bold text-brand-charcoal hover:bg-brand-gray-50"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        )}

        {/* Payment Failed / Expired State */}
        {!loading && !error && result && (result.status === "failed" || result.status === "expired") && (
          <div className="rounded-3xl border border-red-200 bg-white p-8 text-center shadow-xl md:p-12">
            <ShieldAlert className="mx-auto text-red-500" size={56} />
            <h1 className="mt-6 text-2xl font-black text-brand-charcoal md:text-3xl">
              Payment Not Completed
            </h1>
            <p className="mt-3 text-sm text-brand-charcoal/70">
              {result.message || "The payment was not completed or has expired on PayPro."}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/#support"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-nero px-6 py-3 font-bold text-white hover:bg-brand-nero/90"
              >
                Try Donating Again <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-brand-charcoal/20 px-6 py-3 font-bold text-brand-charcoal hover:bg-brand-gray-50"
              >
                Contact Support
              </Link>
            </div>
          </div>
        )}

        {/* Transparency note at bottom */}
        <p className="mt-8 text-center text-xs text-brand-charcoal/50">
          {relationshipDisclosure} All official receipts are issued under {paymentDisclosure.recipient}.
        </p>
      </div>
    </div>
  );
}

export default function DonationReturnPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-brand-gray-50/50">
          <Loader2 className="animate-spin text-brand-nero" size={48} />
        </div>
      }
    >
      <DonationReturnContent />
    </Suspense>
  );
}

