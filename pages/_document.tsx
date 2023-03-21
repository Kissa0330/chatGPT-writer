import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import Script from 'next/script'
import { CssBaseline } from '@nextui-org/react';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: <>{initialProps.styles}</>
    };
  }

  render() {
    return (
      <Html lang="ja">
        <Head>
          {CssBaseline.flush()}
          {process.env.NODE_ENV === 'production' && (
            <Script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1987387144722663"
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
          )}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
