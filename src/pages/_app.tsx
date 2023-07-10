import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppProps, type AppType } from "next/app";
import { api } from "~/utils/api";
import { Plus_Jakarta_Sans } from "next/font/google";
import Head from "next/head";

import "~/styles/globals.css";

import AdminLayout from "~/components/dashboard/Layout";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import AuthGuard from "~/components/auth/AuthGuard";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export type TokoPaediPage<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  authRequired?: boolean;
};

type TokoPaediProps = AppProps & {
  Component: TokoPaediPage;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: TokoPaediProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const authRequired = Component.authRequired ?? false;

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${plusJakartaSans.style.fontFamily};
        }
      `}</style>

      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <SessionProvider session={session}>
        <Head>
          <title>TokoPaedi</title>
          <meta name="description" content="🛒" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {authRequired ? (
          <AuthGuard>{getLayout(<Component {...pageProps} />)}</AuthGuard>
        ) : (
          getLayout(<Component {...pageProps} />)
        )}
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
