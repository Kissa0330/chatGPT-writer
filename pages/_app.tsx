import GoogleAnalytics from '../components/GoogleAnalytics'
import '../styles/globals.css'
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react';
import { useSSR } from '@nextui-org/react'


function MyApp({ Component, pageProps }: AppProps) {
  const { isBrowser } = useSSR()
  return (
    <>
      {isBrowser && (

        <NextUIProvider>
          <GoogleAnalytics />
          <Component {...pageProps} />
        </NextUIProvider>
      )
      }
    </>
  )
}

export default appWithTranslation(MyApp);
