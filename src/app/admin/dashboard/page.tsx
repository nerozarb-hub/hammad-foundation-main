"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  RefreshCw,
  Search,
  LogOut,
  ExternalLink,
  CheckCircle2,
  Clock,
  XCircle,
  Copy,
  Check,
  Building2,
  TrendingUp,
  CreditCard,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface Donation {
  id: string;
  orderNumber: string;
  payProId: string | null;
  amount: number;
  currency: string;
  projectId: string;
  supportOptionId: string;
  donorName: string;
  donorEmail: string | null;
  donorPhone: string | null;
  status: "paid" | "pending" | "failed" | "expired";
  click2PayUrl: string | null;
  billUrl: string | null;
  createdAt: string;
  updatedAt: string;
  paidAt: string | null;
  gatewayAttemptedAt: string | null;
}

interface Stats {
  totalCount: number;
  paidCount: number;
  pendingCount: number;
  failedCount: number;
  totalAmountPaid: number;
  totalAmountAttempted: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [verifyingOrder, setVerifyingOrder] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<{
    orderNumber: string;
    status: string;
    message: string;
  } | null>(null);

  const fetchDonations = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/donations?limit=100", { cache: "no-store" });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (data.success) {
        setDonations(data.donations || []);
        setStats(data.stats || null);
      }
    } catch (err) {
      console.error("Failed to load donations:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [router]);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  async function handleRefresh() {
    setRefreshing(true);
    await fetchDonations();
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  function handleCopy(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function handleVerify(orderNumber: string) {
    setVerifyingOrder(orderNumber);
    setVerificationResult(null);

    try {
      const res = await fetch("/api/admin/verify-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber }),
      });

      const data = await res.json();
      if (data.success) {
        setVerificationResult({
          orderNumber,
          status: data.status,
          message: data.status === "paid" ? "Payment Confirmed as Settled!" : `Status: ${data.status.toUpperCase()}`,
        });
        await fetchDonations();
      } else {
        setVerificationResult({
          orderNumber,
          status: "error",
          message: data.error || "Verification failed",
        });
      }
    } catch {
      setVerificationResult({
        orderNumber,
        status: "error",
        message: "Network error during verification",
      });
    } finally {
      setVerifyingOrder(null);
    }
  }

  const filteredDonations = donations.filter((d) => {
    const matchesStatus = statusFilter === "all" || d.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      d.orderNumber.toLowerCase().includes(q) ||
      (d.payProId && d.payProId.toLowerCase().includes(q)) ||
      d.donorName.toLowerCase().includes(q) ||
      (d.donorEmail && d.donorEmail.toLowerCase().includes(q)) ||
      (d.donorPhone && d.donorPhone.toLowerCase().includes(q));

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0C0F13] text-white selection:bg-brand-nero selection:text-white pb-20">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#12161E]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <span className="text-lg font-[900] tracking-tight">
                HAMMAD <span className="text-brand-nero">FOUNDATION</span>
              </span>
            </Link>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-brand-nero">
              Operations
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              PayPro Live V2 Connected
            </div>

            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw size={16} className={refreshing ? "animate-spin text-brand-nero" : ""} />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 border border-white/10 text-xs font-bold transition-all cursor-pointer"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* Verification banner */}
        {verificationResult && (
          <div
            className={`mb-6 p-4 rounded-2xl border text-sm font-semibold flex items-center justify-between gap-4 transition-all ${
              verificationResult.status === "paid"
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                : verificationResult.status === "error"
                ? "bg-red-500/15 border-red-500/30 text-red-300"
                : "bg-amber-500/15 border-amber-500/30 text-amber-300"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {verificationResult.status === "paid" ? (
                <CheckCircle2 size={18} />
              ) : verificationResult.status === "error" ? (
                <XCircle size={18} />
              ) : (
                <Clock size={18} />
              )}
              <span>
                <strong>{verificationResult.orderNumber}:</strong> {verificationResult.message}
              </span>
            </div>
            <button
              onClick={() => setVerificationResult(null)}
              className="text-xs opacity-70 hover:opacity-100 uppercase tracking-wider font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Page Title */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-[900] tracking-tight">Website Payments &amp; Donations</h1>
            <p className="mt-1 text-sm text-white/60">
              Live audit trail of all donor transactions, PayPro IDs, settlement statuses, and gateway reconciliation.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/50">
            <ShieldCheck size={16} className="text-brand-nero" />
            <span>PostgreSQL Pooler Direct</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#151920] border border-white/10 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/50">Settled Total</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <TrendingUp size={16} />
              </div>
            </div>
            <p className="text-2xl font-[900] text-emerald-400">
              PKR {(stats?.totalAmountPaid || 0).toLocaleString()}
            </p>
            <p className="text-xs text-white/40 mt-1">Confirmed with PayPro GGOS</p>
          </div>

          <div className="bg-[#151920] border border-white/10 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/50">Paid Orders</span>
              <div className="w-8 h-8 rounded-xl bg-brand-nero/15 text-brand-nero flex items-center justify-center">
                <CheckCircle2 size={16} />
              </div>
            </div>
            <p className="text-2xl font-[900] text-white">
              {stats?.paidCount || 0}
            </p>
            <p className="text-xs text-white/40 mt-1">Settled donations</p>
          </div>

          <div className="bg-[#151920] border border-white/10 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/50">Pending / In-Flight</span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Clock size={16} />
              </div>
            </div>
            <p className="text-2xl font-[900] text-amber-400">
              {stats?.pendingCount || 0}
            </p>
            <p className="text-xs text-white/40 mt-1">Awaiting checkout completion</p>
          </div>

          <div className="bg-[#151920] border border-white/10 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/50">Total Checkouts</span>
              <div className="w-8 h-8 rounded-xl bg-white/5 text-white/70 flex items-center justify-center">
                <CreditCard size={16} />
              </div>
            </div>
            <p className="text-2xl font-[900] text-white">
              {stats?.totalCount || 0}
            </p>
            <p className="text-xs text-white/40 mt-1">Total created intentions</p>
          </div>
        </div>

        {/* Filter / Search Bar */}
        <div className="bg-[#151920] border border-white/10 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search donor, order, PayPro ID..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-white placeholder-white/40 outline-none focus:border-brand-nero"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            {["all", "paid", "pending", "failed"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  statusFilter === status
                    ? "bg-brand-nero text-white"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-[#151920] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="py-20 text-center text-white/50 text-sm">
              <RefreshCw size={28} className="animate-spin text-brand-nero mx-auto mb-3" />
              Loading donation records from Supabase...
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="py-20 text-center text-white/50 text-sm">
              No transactions match your search or filter.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white/50 uppercase tracking-wider font-bold">
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Order / PayPro ID</th>
                    <th className="py-3.5 px-4">Donor Information</th>
                    <th className="py-3.5 px-4 text-right">Amount</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredDonations.map((d) => {
                    const isPaid = d.status === "paid";
                    const isPending = d.status === "pending";
                    const isFailed = d.status === "failed" || d.status === "expired";

                    return (
                      <tr key={d.id} className="hover:bg-white/[0.02] transition-colors">
                        {/* Date */}
                        <td className="py-4 px-4 whitespace-nowrap text-white/70">
                          <p className="font-semibold text-white">
                            {new Date(d.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-[10px] text-white/40">
                            {new Date(d.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </td>

                        {/* Order & PayPro ID */}
                        <td className="py-4 px-4 font-mono">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white tracking-tight">{d.orderNumber}</span>
                            <button
                              onClick={() => handleCopy(d.orderNumber, `order-${d.id}`)}
                              className="text-white/30 hover:text-white transition-colors cursor-pointer"
                              title="Copy Order Number"
                            >
                              {copiedId === `order-${d.id}` ? (
                                <Check size={12} className="text-emerald-400" />
                              ) : (
                                <Copy size={12} />
                              )}
                            </button>
                          </div>
                          {d.payProId ? (
                            <div className="flex items-center gap-1 text-[11px] text-brand-nero font-semibold mt-0.5">
                              <span>ID: {d.payProId}</span>
                              <button
                                onClick={() => handleCopy(d.payProId!, `paypro-${d.id}`)}
                                className="text-white/30 hover:text-white transition-colors cursor-pointer"
                                title="Copy PayPro ID"
                              >
                                {copiedId === `paypro-${d.id}` ? (
                                  <Check size={11} className="text-emerald-400" />
                                ) : (
                                  <Copy size={11} />
                                )}
                              </button>
                            </div>
                          ) : (
                            <p className="text-[10px] text-white/30 italic mt-0.5">No PayPro ID attached</p>
                          )}
                        </td>

                        {/* Donor */}
                        <td className="py-4 px-4">
                          <p className="font-bold text-white">{d.donorName}</p>
                          <p className="text-white/60 text-[11px]">{d.donorEmail || "No email"}</p>
                          <p className="text-white/40 text-[10px]">{d.donorPhone || "No phone"}</p>
                        </td>

                        {/* Amount */}
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <p className="text-sm font-black text-white">
                            PKR {d.amount.toLocaleString()}
                          </p>
                          <p className="text-[10px] text-white/40 uppercase tracking-wider">{d.supportOptionId}</p>
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          {isPaid ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                              <CheckCircle2 size={12} />
                              Paid
                            </span>
                          ) : isPending ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold uppercase tracking-wider text-[10px]">
                              <Clock size={12} />
                              Pending
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 font-bold uppercase tracking-wider text-[10px]">
                              <XCircle size={12} />
                              {d.status}
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            {d.click2PayUrl && (
                              <a
                                href={d.click2PayUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                                title="Open PayPro Checkout Page"
                              >
                                <ExternalLink size={14} />
                              </a>
                            )}

                            {d.payProId && (
                              <button
                                onClick={() => handleVerify(d.orderNumber)}
                                disabled={verifyingOrder === d.orderNumber}
                                className="px-2.5 py-1 rounded-lg bg-brand-nero/15 hover:bg-brand-nero/25 text-brand-nero font-bold text-[10px] uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
                                title="Check latest settlement status with PayPro GGOS"
                              >
                                {verifyingOrder === d.orderNumber ? "Checking..." : "Verify GGOS"}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
