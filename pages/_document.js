import * as snippet from '@segment/snippet';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

export default class MyDocument extends Document {
  static renderSnippet() {
    const opts = {
      apiKey: process.env.SEGMENT_API_KEY,
      page: true,
    };
    return snippet.min(opts);
  }

  render() {
    return (
      <Html>

        <Head>
          {process.env.NODE_ENV == 'production'
            && <script dangerouslySetInnerHTML={{ __html: MyDocument.renderSnippet() }} />}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>

      </Html>
    );
  }
}
