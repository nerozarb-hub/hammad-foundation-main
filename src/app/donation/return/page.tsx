"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Clock3, Loader2, ShieldCheck, XCircle, ArrowRight, HeartHandshake } from "lucide-react";

type Verification = {
  success?: boolean;
  status?: "pending" | "paid" | "failed" | "expired";
  orderNumber?: string;
  payProId?: string | null;
  amount?: number;
  currency?: string;
  donorName?: string;
  paidAt?: string | null;
  isVerifiedWithGateway?: boolean;
  message?: string;
  error?: string;
};

function ReturnContent() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<Verification | null>(null);
  const [loading, setLoading] = useState(true);

  const verify = useCallback(async () => {
    const orderNumber = searchParams.get("orderNumber") || searchParams.get("ord") || searchParams.get("order_number");
    const payProId = searchParams.get("payProId") || searchParams.get("ordId") || searchParams.get("cpayId") || searchParams.get("cpayid");

    if (!orderNumber && !payProId) {
      setResult({ error: "Payment reference was not returned by PayPro." });
      setLoading(false);
      return;
    }

    setLoading(true);
    const params = new URLSearchParams();
    if (orderNumber) params.set("orderNumber", orderNumber);
    if (payProId) params.set("payProId", payProId);

    try {
      const response = await fetch(`/api/paypro/verify?${params.toString()}`, {
        cache: "no-store",
      });
      const payload = (await response.json()) as Verification;
      setResult(payload);
    } catch {
      setResult({ error: "Payment status could not be verified automatically. Please contact support." });
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    void verify();
  }, [verify]);

  const paid = result?.status === "paid" && result.isVerifiedWithGateway;
  const failed = result?.status === "failed" || result?.status === "expired";

  return (
    <div className="min-h-screen bg-brand-gray-50/50 px-4 py-16 md:py-24 selection:bg-brand-nero selection:text-white">
      <div className="mx-auto max-w-2xl rounded-3xl border border-brand-charcoal/10 bg-white p-8 sm:p-12 text-center shadow-xl">
        {loading ? (
          <Loader2 className="mx-auto animate-spin text-brand-nero" size={56} />
        ) : paid ? (
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-brand-nero flex items-center justify-center mx-auto">
            <CheckCircle2 size={40} className="stroke-[2.5]" />
          </div>
        ) : failed ? (
          <div className="w-16 h-16 rounded-full bg-red-500/15 text-red-500 flex items-center justify-center mx-auto">
            <XCircle size={40} className="stroke-[2.5]" />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center mx-auto">
            <Clock3 size={40} className="stroke-[2.5]" />
          </div>
        )}

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-nero/10 text-brand-nero text-[11px] font-bold uppercase tracking-wider mt-6">
          <ShieldCheck size={14} />
          PayPro V2 Official Verification
        </div>

        <h1 className="mt-4 text-2xl sm:text-4xl font-[900] tracking-tight text-brand-charcoal">
          {loading
            ? "Verifying Payment with PayPro..."
            : paid
            ? "Thank You! Donation Confirmed"
            : failed
            ? "Payment Was Not Completed"
            : "Payment Processing / Pending"}
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-brand-charcoal/70 font-medium">
          {loading
            ? "Connecting directly to PayPro settlement clearing network to verify your transaction."
            : result?.message ||
              result?.error ||
              (paid
                ? "Your contribution has been settled and credited directly to the Hammad Foundation School education fund."
                : "If you have already paid, your bank may take a few minutes to notify PayPro.")}
        </p>

        {result?.orderNumber && (
          <div className="mt-8 space-y-3 rounded-2xl border border-brand-charcoal/10 bg-brand-gray-50/70 p-6 text-left text-sm">
            <div className="flex justify-between gap-4 border-b border-brand-charcoal/10 pb-3">
              <span className="text-brand-charcoal/60 font-semibold text-xs uppercase tracking-wider">
                Order Reference
              </span>
              <span className="font-mono font-bold text-brand-charcoal">{result.orderNumber}</span>
            </div>

            {result.payProId && (
              <div className="flex justify-between gap-4 border-b border-brand-charcoal/10 pb-3">
                <span className="text-brand-charcoal/60 font-semibold text-xs uppercase tracking-wider">
                  PayPro ID
                </span>
                <span className="font-mono font-bold text-brand-nero">{result.payProId}</span>
              </div>
            )}

            {result.amount && (
              <div className="flex justify-between gap-4 pt-1">
                <span className="text-brand-charcoal/60 font-semibold text-xs uppercase tracking-wider">
                  Amount
                </span>
                <span className="font-black text-brand-charcoal text-base">
                  {result.currency || "PKR"} {result.amount.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-nero px-6 py-3.5 font-black text-sm uppercase tracking-wider text-white hover:bg-brand-nero/90 transition-colors shadow-lg shadow-brand-nero/20"
          >
            Back to Home <ArrowRight size={16} />
          </Link>
          {!paid && (
            <Link
              href="/donate"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-charcoal/20 px-6 py-3.5 font-bold text-sm text-brand-charcoal hover:bg-brand-gray-50 transition-colors"
            >
              Try Again
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DonationReturnPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-brand-nero" size={40} />
        </div>
      }
    >
      <ReturnContent />
    </Suspense>
  );
}
