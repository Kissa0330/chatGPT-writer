import GoogleAnalytics from '../components/GoogleAnalytics'
import '../styles/globals.css'
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics />

      <Component {...pageProps} />
    </>
  )
}

export default appWithTranslation(MyApp);
