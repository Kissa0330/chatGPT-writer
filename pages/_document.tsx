import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {process.env.NODE_ENV === 'production' && (
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1987387144722663"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
