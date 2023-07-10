import Head from "next/head";

import { Header } from "~/components/landing/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="🛒" />
      </Head>
      <Header />
      <main>Main Content</main>
    </>
  );
}
