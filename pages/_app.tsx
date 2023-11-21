import Head from 'next/head';
import { Provider } from 'react-redux';
import 'styles/reset.scss';
import 'antd/dist/antd.css';
import 'styles/global.scss';
import 'styles/custom-antd.scss';
import 'styles/app.scss';
import store from 'store';
import { AppPropsWithLayout } from 'models/common';
import MainLayoyt from 'components/layout/main-layout';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? MainLayoyt;

  return (
    <Provider store={store}>
      <Head>
        <title>SLI Home</title>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
