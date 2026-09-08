import 'server-only';
import crypto from 'node:crypto';
import { getVerifiedPaymentDatabase } from './pool.ts';
import type { DonationRecord, DonationStatus } from '../paypro/types.ts';

export interface Queryable { query(text: string, values?: unknown[]): Promise<{ rows: Record<string, unknown>[] }> }
export type StoredDonation = DonationRecord & { checkoutKeyHash: string; requestHash: string; receiptTokenHash: string; gatewayAttemptedAt: string | null };
export interface NewDonation {
  orderNumber: string; amount: number; donorName: string; donorEmail: string; donorPhone: string;
  supportOptionId: string; checkoutKeyHash: string; requestHash: string; receiptTokenHash: string;
}
export interface IDonationRepository {
  reserve(record: NewDonation): Promise<StoredDonation>;
  findByOrderNumber(orderNumber: string): Promise<StoredDonation | null>;
  findByPayProId(payProId: string): Promise<StoredDonation | null>;
  claimGatewayAttempt(orderNumber: string): Promise<boolean>;
  attachPayProId(orderNumber: string, payProId: string, click2PayUrl: string, billUrl?: string): Promise<StoredDonation>;
  recordVerification(orderNumber: string, payProId: string, status: DonationStatus, paidAmount?: number): Promise<StoredDonation>;
  consumeRateLimit(bucket: string, limit: number, windowSeconds: number): Promise<boolean>;
}
function date(value: unknown): string { return new Date(value as string).toISOString(); }
function map(row: Record<string, unknown>): StoredDonation {
  return { id: String(row.id), orderNumber: String(row.order_number), payProId: row.paypro_id == null ? null : String(row.paypro_id),
    amount: Number(row.amount), currency: 'PKR', projectId: 'hammad-foundation', supportOptionId: String(row.support_option_id),
    donorName: String(row.donor_name), donorEmail: row.donor_email as string | null, donorPhone: row.donor_phone as string | null,
    status: row.status as DonationStatus, click2PayUrl: row.click2pay_url as string | null, billUrl: row.bill_url as string | null,
    createdAt: date(row.created_at), updatedAt: date(row.updated_at), paidAt: row.paid_at ? date(row.paid_at) : null,
    metadata: row.metadata as Record<string, unknown>, checkoutKeyHash: String(row.checkout_key_hash ?? ''),
    requestHash: String(row.request_hash ?? ''), receiptTokenHash: String(row.receipt_token_hash ?? ''),
    gatewayAttemptedAt: row.gateway_attempted_at ? date(row.gateway_attempted_at) : null };
}

export class PostgresDonationRepository implements IDonationRepository {
  private db: Queryable;
  constructor(db: Queryable = getVerifiedPaymentDatabase()) { this.db = db; }
  private async query(sql: string, params: unknown[] = []) {
    try { return await this.db.query(sql, params); }
    catch { throw new Error('Payment database operation failed'); }
  }
  async reserve(r: NewDonation): Promise<StoredDonation> {
    const result = await this.query(`INSERT INTO donations
      (id,order_number,amount,donor_name,donor_email,donor_phone,support_option_id,status,checkout_key_hash,request_hash,receipt_token_hash)
      VALUES ($1,$2,$3,$4,$5,$6,$7,'pending',$8,$9,$10)
      ON CONFLICT (checkout_key_hash) DO UPDATE SET checkout_key_hash=EXCLUDED.checkout_key_hash RETURNING *`,
    [crypto.randomUUID(),r.orderNumber,r.amount,r.donorName,r.donorEmail || null,r.donorPhone || null,r.supportOptionId,r.checkoutKeyHash,r.requestHash,r.receiptTokenHash]);
    return map(result.rows[0]);
  }
  async findByOrderNumber(value: string) { const r = await this.query('SELECT * FROM donations WHERE order_number=$1', [value]); return r.rows[0] ? map(r.rows[0]) : null; }
  async findByPayProId(value: string) { const r = await this.query('SELECT * FROM donations WHERE paypro_id=$1', [value]); return r.rows[0] ? map(r.rows[0]) : null; }
  async claimGatewayAttempt(orderNumber: string) {
    const r = await this.query(`UPDATE donations SET gateway_attempted_at=NOW(),updated_at=NOW()
      WHERE order_number=$1 AND gateway_attempted_at IS NULL AND paypro_id IS NULL AND status='pending' RETURNING id`, [orderNumber]);
    return r.rows.length === 1;
  }
  async attachPayProId(orderNumber: string, payProId: string, click2PayUrl: string, billUrl?: string) {
    const r = await this.query(`UPDATE donations SET paypro_id=$2,click2pay_url=$3,bill_url=$4,updated_at=NOW()
      WHERE order_number=$1 AND gateway_attempted_at IS NOT NULL AND (paypro_id IS NULL OR paypro_id=$2) RETURNING *`, [orderNumber,payProId,click2PayUrl,billUrl ?? null]);
    if (!r.rows[0]) throw new Error('Payment identifier could not be stored');
    return map(r.rows[0]);
  }
  async recordVerification(orderNumber: string, payProId: string, status: DonationStatus, paidAmount?: number) {
    // Atomic and monotonic: duplicate callbacks cannot change paid_at, and a
    // later failed/pending response cannot downgrade a settled donation.
    const r = await this.query(`UPDATE donations SET
      status=CASE WHEN status='paid' THEN status ELSE $3 END,
      paid_at=CASE WHEN status='paid' THEN paid_at WHEN $3='paid' THEN NOW() ELSE NULL END,
      verified_paypro_id=CASE WHEN status='paid' THEN verified_paypro_id WHEN $3='paid' THEN $2 ELSE NULL END,
      verified_amount=CASE WHEN status='paid' THEN verified_amount WHEN $3='paid' THEN $4::numeric ELSE NULL END,
      updated_at=CASE WHEN status='paid' THEN updated_at ELSE NOW() END
      WHERE order_number=$1 AND paypro_id=$2 AND ($3<>'paid' OR amount=$4::numeric) RETURNING *`, [orderNumber,payProId,status,paidAmount ?? null]);
    if (!r.rows[0]) throw new Error('Payment verification mismatch');
    return map(r.rows[0]);
  }
  async consumeRateLimit(bucket: string, limit: number, windowSeconds: number) {
    const r = await this.query(`INSERT INTO payment_rate_limits(bucket,hits,resets_at) VALUES($1,1,NOW()+$3*INTERVAL '1 second')
      ON CONFLICT(bucket) DO UPDATE SET
      hits=CASE WHEN payment_rate_limits.resets_at<=NOW() THEN 1 ELSE payment_rate_limits.hits+1 END,
      resets_at=CASE WHEN payment_rate_limits.resets_at<=NOW() THEN NOW()+$3*INTERVAL '1 second' ELSE payment_rate_limits.resets_at END
      WHERE payment_rate_limits.resets_at<=NOW() OR payment_rate_limits.hits<$2 RETURNING hits`, [bucket,limit,windowSeconds]);
    return r.rows.length === 1;
  }
}
export function getDonationRepository(): IDonationRepository { return new PostgresDonationRepository(); }
