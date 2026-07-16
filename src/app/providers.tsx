"use client";

import { store } from "@/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      {children}
      <Toaster richColors position="top-right" />
    </ReduxProvider>
  );
}
