import { PropsWithChildren } from 'react';
import NextHead from 'next/head';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { NextUIProvider } from '@nextui-org/react';
import { LayoutWrapper } from 'ui';
import Header from '@/components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <DefaultLayout>
        <NextUIProvider>
          <Head />
          <Component {...pageProps} />
        </NextUIProvider>
      </DefaultLayout>
    </RecoilRoot>
  );
}

export default MyApp;

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <LayoutWrapper>
      <Header />
      {children}
    </LayoutWrapper>
  );
};

const Head = () => {
  return (
    <NextHead>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0 viewport-fit=cover"
      />
      <title>playground</title>
    </NextHead>
  );
};
