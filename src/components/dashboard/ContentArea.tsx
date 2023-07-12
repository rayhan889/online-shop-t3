import type { PropsWithChildren } from "react";

export default function ContentArea({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen bg-[#FAFAFA] py-6 md:pl-64">
      <div className="mx-auto px-4 sm:px-6 md:px-8">{children}</div>
    </main>
  );
}
