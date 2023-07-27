import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { theme } from '../theme/index';
import createEmotionCache from '../utils/createEmotionCache';
import { SessionProvider } from 'next-auth/react';
import { trpc } from '@/utils/trpc';
import { LicenseInfo } from '@mui/x-data-grid-pro';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_MUI_X_LICENSE_KEY ?? '');

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;

  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
