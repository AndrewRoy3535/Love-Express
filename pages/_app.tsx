import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../component/layout/Layout";
import "../styles/appbar.css";
import "../styles/busScheduleForm.css";
import "../styles/createUserForm.css";
import "../styles/formHeader.css";
import "../styles/searchForm.css";
import "../styles/searchResults.css";
import "../styles/salesList.css";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
