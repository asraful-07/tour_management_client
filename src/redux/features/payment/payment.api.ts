import { baseApi } from "@/redux/baseApi";
import {
  InvoiceUrlResponse,
  PaymentByTransactionResponse,
} from "./payment.interface";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentByTransaction: builder.query<
      PaymentByTransactionResponse,
      string
    >({
      query: (transactionId) => ({
        url: `/payment/by-transaction/${transactionId}`,
        method: "GET",
      }),
    }),
    getInvoiceDownloadUrl: builder.query<InvoiceUrlResponse, string>({
      query: (paymentId) => ({
        url: `/payment/invoice/${paymentId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPaymentByTransactionQuery,
  useLazyGetInvoiceDownloadUrlQuery,
} = paymentApi;
