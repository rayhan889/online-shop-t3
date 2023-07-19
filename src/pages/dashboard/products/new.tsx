import { ReactElement } from "react";
import type { GetServerSideProps } from "next";
import type { TokoPaediPage } from "~/pages/_app";
import Head from "next/head";
import AdminLayout from "~/components/dashboard/Layout";
import { getServerAuthSession } from "~/server/auth";
import { NewProductForm } from "~/components/form/product/newForm";

const NewProduct: TokoPaediPage = ({}) => {
  return (
    <>
      <Head>
        <title>TokoPaedi | Create Products</title>
      </Head>
      <NewProductForm />
    </>
  );
};

NewProduct.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

NewProduct.authRequired = true;

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

export default NewProduct;
