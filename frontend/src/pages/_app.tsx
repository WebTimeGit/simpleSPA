import nextCookies from "next-cookies";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import {Layout} from "@/components/layout/layout";
import React from "react";
import {AuthContextProvider} from "@/context/authContext";
import {AuthRedirect} from "@/routes/AuthRedirect";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <AuthRedirect>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthRedirect>
    </AuthContextProvider>
  )
}

export async function getServerSideProps(context: any) {
  const allCookies = nextCookies(context);
  const cookieValue = allCookies['token'] || '';

  return {
    props: {
      cookieValue,
      test:"test"
    },
  };
}