import Page from 'components/Page';
import 'styles/index.scss';
import 'sal.js/dist/sal.css';

export default function App({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
      ;
    </Page>
  );
}
