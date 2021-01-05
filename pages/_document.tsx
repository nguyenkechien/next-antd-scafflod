import Document, { Head, Main, NextScript } from 'next/document';
import { NextPageContext } from 'next';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any): NextPageContext {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
