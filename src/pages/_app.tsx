import { type AppType } from "next/app";

import "@/styles/globals.css";

import Layout from "@/components/organisms/layout";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
