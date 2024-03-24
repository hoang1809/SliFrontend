import Head from 'next/head';
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import 'styles/reset.scss';
//import 'antd/dist/antd.css';
import 'styles/global.scss';
import 'styles/custom-antd.scss';
import 'styles/app.scss';
import store from 'store';
import { AppPropsWithLayout } from 'models/common';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>USTH</title>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

