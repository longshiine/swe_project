// import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Header from "../components/common/header";
import { Layout } from "antd";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout className="site-layout">
        <Header />
        <Component />
      </Layout>
    </>
  );
}
