export type DonationStatus = "pending" | "paid" | "failed" | "expired";

export interface DonationRecord {
  id: string;
  orderNumber: string;
  payProId: string | null;
  amount: number;
  currency: "PKR";
  projectId: "hammad-foundation";
  supportOptionId: string;
  donorName: string;
  donorEmail: string | null;
  donorPhone: string | null;
  status: DonationStatus;
  click2PayUrl: string | null;
  billUrl: string | null;
  createdAt: string;
  updatedAt: string;
  paidAt: string | null;
  metadata: Record<string, unknown>;
}

export interface PayProCreateOrderPayload {
  OrderNumber: string;
  OrderAmount: string;
  OrderDueDate: string;
  OrderType: string;
  IssueDate: string;
  OrderExpireAfterSeconds: string;
  CustomerName: string;
  CustomerMobile: string;
  CustomerEmail: string;
  CustomerAddress: string;
}

export interface PayProOrderResponseItem {
  Status?: string | number;
  Description?: string;
  PayProId?: string | number;
  InvoiceId?: string | number;
  OrderNumber?: string;
  Click2Pay?: string;
  click2pay?: string;
  BillUrl?: string;
}

export type PayProCreateOrderResponse = PayProOrderResponseItem | PayProOrderResponseItem[];

export interface PayProGgosRequest {
  userName: string;
  cpayId: string;
}

export interface PayProGgosResponseItem {
  OrderStatus?: string | number;
  Status?: string | number;
  Description?: string;
  OrderNumber?: string;
  AmountPayable?: string | number;
  OrderAmountPaid?: string | number;
  DatePaid?: string;
}

export type PayProGgosResponse = PayProGgosResponseItem | PayProGgosResponseItem[];

export interface PayProCallbackResponseItem {
  StatusCode: "00" | "01" | "02" | "03";
  InvoiceID: string | null;
  Description: string;
}

export interface VerifyDonationResult {
  success: boolean;
  status: DonationStatus;
  orderNumber: string;
  payProId: string | null;
  amount: number;
  currency: "PKR";
  donorName: string;
  paidAt: string | null;
  isVerifiedWithGateway: boolean;
  message: string;
}
