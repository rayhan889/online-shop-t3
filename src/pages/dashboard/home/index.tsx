import { FC, ReactElement } from "react";
import { useSession } from "next-auth/react";
import type { TokoPaediPage } from "~/pages/_app";
import Head from "next/head";
import AdminLayout from "~/components/dashboard/Layout";

const Home: TokoPaediPage = ({}) => {
  return (
    <>
      <Head>
        <title>TokoPaedi | Dashboard</title>
      </Head>
      <div>Home</div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

Home.authRequired = true;

export default Home;
