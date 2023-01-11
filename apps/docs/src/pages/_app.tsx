import { PropsWithChildren } from 'react';
import type { AppProps } from 'next/app';
import { LayoutWrapper } from 'ui';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </RecoilRoot>
  );
}

export default MyApp;

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};
