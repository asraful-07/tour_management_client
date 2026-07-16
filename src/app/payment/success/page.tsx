"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useGetPaymentByTransactionQuery,
  useLazyGetInvoiceDownloadUrlQuery,
} from "@/redux/features/payment/payment.api";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId") ?? "";
  const amount = searchParams.get("amount");

  const { data, isLoading } = useGetPaymentByTransactionQuery(transactionId, {
    skip: !transactionId,
  });
  const [getInvoiceUrl, { isFetching: isInvoiceLoading }] =
    useLazyGetInvoiceDownloadUrlQuery();

  const payment = data?.data;

  const handleDownloadInvoice = async () => {
    if (!payment?._id) return;
    const res = await getInvoiceUrl(payment._id).unwrap();
    if (res?.data) window.open(res.data, "_blank");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-green-500" />
        <h1 className="mb-2 text-2xl font-bold">Payment successful</h1>
        <p className="mb-6 text-sm text-gray-500">
          Your booking has been confirmed. An invoice has also been emailed to
          you.
        </p>

        <div className="mb-6 space-y-1 rounded-lg bg-gray-50 p-4 text-left text-sm">
          <div className="flex justify-between">
            <span>Transaction ID</span>
            <span className="font-medium">{transactionId}</span>
          </div>
          {amount && (
            <div className="flex justify-between">
              <span>Amount</span>
              <span className="font-medium">${amount}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Button
            onClick={handleDownloadInvoice}
            disabled={isLoading || isInvoiceLoading || !payment?._id}
          >
            {isInvoiceLoading ? "Preparing..." : "Download invoice"}
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Back to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
