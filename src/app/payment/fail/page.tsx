"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentFailPage() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const message = searchParams.get("message");

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border p-8 text-center shadow-sm">
        <XCircle className="mx-auto mb-4 h-14 w-14 text-red-500" />
        <h1 className="mb-2 text-2xl font-bold">Payment failed</h1>
        <p className="mb-6 text-sm text-gray-500">
          {message || "Something went wrong while processing your payment."}
        </p>
        {transactionId && (
          <p className="mb-6 text-xs text-gray-400">
            Transaction ID: {transactionId}
          </p>
        )}
        <div className="flex flex-col gap-2">
          <Link href="/tours">
            <Button className="w-full">Try again</Button>
          </Link>
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
