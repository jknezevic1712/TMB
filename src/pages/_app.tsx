import { type AppType } from "next/app";

import "@/styles/globals.css";

import Layout from "@/components/organisms/layout";
import { Toaster } from "@/components/organisms/toaster";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  );
};

export default MyApp;
