import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";

import { ThemeProvider } from "next-themes";
import "~/styles/globals.css";

import AdminLayout from "~/components/dashboard/Layout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
