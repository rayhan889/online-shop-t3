import { ReactElement } from "react";
import type { GetServerSideProps } from "next";
import type { TokoPaediPage } from "~/pages/_app";
import Head from "next/head";
import AdminLayout from "~/components/dashboard/Layout";
import { getServerAuthSession } from "~/server/auth";

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Home;
