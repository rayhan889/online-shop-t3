import type { PropsWithChildren } from "react";

export default function ContentArea({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen bg-white py-6 md:pl-64">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">{children}</div>
    </main>
  );
}
