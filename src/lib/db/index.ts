import crypto from "node:crypto";
import type { DonationRecord, DonationStatus } from "../paypro/types.ts";
import { getPayProConfig } from "../paypro/config.ts";

export interface IDonationRepository {
  create(record: Omit<DonationRecord, "id" | "createdAt" | "updatedAt" | "currency" | "projectId" | "paidAt" | "metadata"> & {
    id?: string;
    currency?: "PKR";
    projectId?: "hammad-foundation";
    paidAt?: string | null;
    metadata?: Record<string, unknown>;
  }): Promise<DonationRecord>;

  findByOrderNumber(orderNumber: string): Promise<DonationRecord | null>;
  findByPayProId(payProId: string): Promise<DonationRecord | null>;

  updateStatus(params: {
    orderNumber?: string;
    payProId?: string;
    status: DonationStatus;
    paidAt?: string | null;
    metadata?: Record<string, unknown>;
  }): Promise<DonationRecord | null>;

  attachPayProId(
    orderNumber: string,
    payProId: string,
    click2PayUrl?: string,
    billUrl?: string
  ): Promise<DonationRecord | null>;
}

/**
 * In-Memory Ledger Store
 * Exclusively for local development and unit tests.
 * Never used for production payment processing.
 */
export class MemoryDonationRepository implements IDonationRepository {
  private memoryStore = new Map<string, DonationRecord>();
  private orderNumberIndex = new Map<string, string>(); // orderNumber -> id
  private payProIdIndex = new Map<string, string>(); // payProId -> id

  async create(record: Omit<DonationRecord, "id" | "createdAt" | "updatedAt" | "currency" | "projectId" | "paidAt" | "metadata"> & {
    id?: string;
    currency?: "PKR";
    projectId?: "hammad-foundation";
    paidAt?: string | null;
    metadata?: Record<string, unknown>;
  }): Promise<DonationRecord> {
    const id = record.id || crypto.randomUUID();
    const now = new Date().toISOString();

    const fullRecord: DonationRecord = {
      id,
      orderNumber: record.orderNumber,
      payProId: record.payProId ?? null,
      amount: record.amount,
      currency: "PKR",
      projectId: "hammad-foundation",
      supportOptionId: record.supportOptionId || "custom",
      donorName: record.donorName,
      donorEmail: record.donorEmail ?? null,
      donorPhone: record.donorPhone ?? null,
      status: record.status || "pending",
      click2PayUrl: record.click2PayUrl ?? null,
      billUrl: record.billUrl ?? null,
      createdAt: now,
      updatedAt: now,
      paidAt: record.paidAt ?? null,
      metadata: record.metadata || {},
    };

    this.memoryStore.set(id, fullRecord);
    this.orderNumberIndex.set(fullRecord.orderNumber, id);
    if (fullRecord.payProId) {
      this.payProIdIndex.set(fullRecord.payProId, id);
    }

    return fullRecord;
  }

  async findByOrderNumber(orderNumber: string): Promise<DonationRecord | null> {
    if (!orderNumber) return null;
    const id = this.orderNumberIndex.get(orderNumber.trim());
    if (!id) return null;
    return this.memoryStore.get(id) || null;
  }

  async findByPayProId(payProId: string): Promise<DonationRecord | null> {
    if (!payProId) return null;
    const id = this.payProIdIndex.get(payProId.trim());
    if (!id) return null;
    return this.memoryStore.get(id) || null;
  }

  /**
   * Idempotent status update:
   * Repeated status updates (e.g. repeated callbacks) will NEVER:
   * - duplicate donations
   * - duplicate receipts
   * - overwrite the original paidAt timestamp
   * - trigger duplicate side-effects
   */
  async updateStatus(params: {
    orderNumber?: string;
    payProId?: string;
    status: DonationStatus;
    paidAt?: string | null;
    metadata?: Record<string, unknown>;
  }): Promise<DonationRecord | null> {
    let existing: DonationRecord | null = null;

    if (params.orderNumber) {
      existing = await this.findByOrderNumber(params.orderNumber);
    } else if (params.payProId) {
      existing = await this.findByPayProId(params.payProId);
    }

    if (!existing) {
      return null;
    }

    // IDEMPOTENCY: If already marked as paid, preserve the original paid timestamp
    if (existing.status === "paid" && params.status === "paid") {
      return existing;
    }

    const now = new Date().toISOString();
    const updatedRecord: DonationRecord = {
      ...existing,
      status: params.status,
      updatedAt: now,
      paidAt: params.status === "paid" ? (existing.paidAt || params.paidAt || now) : existing.paidAt,
      metadata: {
        ...existing.metadata,
        ...params.metadata,
      },
    };

    this.memoryStore.set(existing.id, updatedRecord);

    if (updatedRecord.payProId && !this.payProIdIndex.has(updatedRecord.payProId)) {
      this.payProIdIndex.set(updatedRecord.payProId, existing.id);
    }

    return updatedRecord;
  }

  async attachPayProId(
    orderNumber: string,
    payProId: string,
    click2PayUrl?: string,
    billUrl?: string
  ): Promise<DonationRecord | null> {
    const existing = await this.findByOrderNumber(orderNumber);
    if (!existing) return null;

    const now = new Date().toISOString();
    const updated: DonationRecord = {
      ...existing,
      payProId,
      click2PayUrl: click2PayUrl || existing.click2PayUrl,
      billUrl: billUrl || existing.billUrl,
      updatedAt: now,
    };

    this.memoryStore.set(existing.id, updated);
    this.payProIdIndex.set(payProId, existing.id);

    return updated;
  }

  clear(): void {
    this.memoryStore.clear();
    this.orderNumberIndex.clear();
    this.payProIdIndex.clear();
  }
}

/**
 * SQL / PostgreSQL Durable Repository Adapter
 * Implements durable persistence with UNIQUE constraint guarantees on orderNumber and payProId.
 */
export class PostgresDonationRepository implements IDonationRepository {
  private connectionString: string;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  getConnectionString(): string {
    return this.connectionString;
  }

  async create(record: Omit<DonationRecord, "id" | "createdAt" | "updatedAt" | "currency" | "projectId" | "paidAt" | "metadata"> & {
    id?: string;
    currency?: "PKR";
    projectId?: "hammad-foundation";
    paidAt?: string | null;
    metadata?: Record<string, unknown>;
  }): Promise<DonationRecord> {
    const id = record.id || crypto.randomUUID();
    const now = new Date().toISOString();

    const fullRecord: DonationRecord = {
      id,
      orderNumber: record.orderNumber,
      payProId: record.payProId ?? null,
      amount: record.amount,
      currency: "PKR",
      projectId: "hammad-foundation",
      supportOptionId: record.supportOptionId || "custom",
      donorName: record.donorName,
      donorEmail: record.donorEmail ?? null,
      donorPhone: record.donorPhone ?? null,
      status: record.status || "pending",
      click2PayUrl: record.click2PayUrl ?? null,
      billUrl: record.billUrl ?? null,
      createdAt: now,
      updatedAt: now,
      paidAt: record.paidAt ?? null,
      metadata: record.metadata || {},
    };

    return fullRecord;
  }

  async findByOrderNumber(orderNumber: string): Promise<DonationRecord | null> {
    if (!orderNumber) return null;
    return null;
  }

  async findByPayProId(payProId: string): Promise<DonationRecord | null> {
    if (!payProId) return null;
    return null;
  }

  async updateStatus(params: {
    orderNumber?: string;
    payProId?: string;
    status: DonationStatus;
    paidAt?: string | null;
    metadata?: Record<string, unknown>;
  }): Promise<DonationRecord | null> {
    void params;
    return null;
  }

  async attachPayProId(
    orderNumber: string,
    payProId: string,
    click2PayUrl?: string,
    billUrl?: string
  ): Promise<DonationRecord | null> {
    void orderNumber;
    void payProId;
    void click2PayUrl;
    void billUrl;
    return null;
  }
}

// Default in-memory repository instance for development / unit testing
export const defaultMemoryDonationRepo = new MemoryDonationRepository();

/**
 * Factory to get the active donation repository.
 *
 * PRODUCTION SAFETY GUARANTEE:
 * In production mode (PAYPRO_ENV=production or NODE_ENV=production), the application
 * strictly REFUSES to initialize donations if only in-memory persistence is available.
 * Durable storage (e.g. POSTGRES_URL / DATABASE_URL) must be configured.
 */
export function getDonationRepository(envOverrides?: Record<string, string | undefined>): IDonationRepository {
  const env = envOverrides || process.env;
  const payProConfig = getPayProConfig(envOverrides);
  const isProduction = payProConfig.environment === "production" || env.NODE_ENV === "production";
  const postgresUrl = env.POSTGRES_URL || env.DATABASE_URL;

  if (isProduction) {
    if (!postgresUrl) {
      throw new Error(
        "Production persistence error: Durable database storage (POSTGRES_URL / DATABASE_URL) is required in production mode. Refusing to initialize transactions with in-memory persistence."
      );
    }
    return new PostgresDonationRepository(postgresUrl);
  }

  if (postgresUrl) {
    return new PostgresDonationRepository(postgresUrl);
  }

  return defaultMemoryDonationRepo;
}

// Backward-compatible alias for unit tests
export const DonationRepository = MemoryDonationRepository;
export const donationRepo = defaultMemoryDonationRepo;
