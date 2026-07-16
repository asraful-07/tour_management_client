export enum PAYMENT_STATUS {
  PAID = "PAID",
  UNPAID = "UNPAID",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export interface IPayment {
  _id: string;
  booking: {
    _id: string;
    tour?: { title: string };
  };
  transactionId: string;
  amount: number;
  status: PAYMENT_STATUS;
  invoiceUrl?: string;
  createdAt: string;
}

export interface PaymentByTransactionResponse {
  success: boolean;
  data: IPayment;
}

export interface InvoiceUrlResponse {
  success: boolean;
  data: string;
}
