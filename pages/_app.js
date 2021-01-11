import App, { Container } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '../redux/store';
import Layout from '../layout';
import { RouterType, SHARE } from '../constants/ConstTypes';
import '../assets/self-styles.less';
import NProgress from 'nprogress';
import { createGlobalStyle } from 'styled-components';
import { color_nprogress } from '../constants/CustomTheme';
import Router from 'next/router';
import logger from '../core/Logger';
import { fetchSystemData } from '../redux/actions/common';
import Header from '../containers/Header';
import { Auth } from '../core/Auth';

class NextApp extends App {
  static async getInitialProps({ Component, ctx, router }) {
    let pageProps = {};
    const { pathname, store, isServer } = ctx;
    if (isServer) store.dispatch(fetchSystemData());

    const route = pathname;
    logger.log('\nroute: ', route, '\n', router);

    const routerType = (RouterType[route] && RouterType[route].type) || SHARE;
    const auth = await Auth.authOnServer(ctx);
    const {
      getInitialProps,
      getServersideProps,
      getStaticProps,
      getStaticPaths,
    } = Component;

    const initialProps =
      getInitialProps && (await getInitialProps({ ctx, auth, routerType }));

    const serverSide =
      getServersideProps && (await getServersideProps({ ctx }));

    const staticProps = getStaticProps && (await getStaticProps({ ctx }));

    const staticPaths = getStaticPaths && (await getStaticPaths({ ctx }));

    pageProps = {
      ...pageProps,
      ...serverSide,
      ...staticProps,
      ...staticPaths,
      ...initialProps,
    };

    logger.log(`pageProps`, pageProps);
    return { pageProps };
  }

  componentDidMount() {
    NProgress.configure({ showSpinner: false });
    Router.events.on('routeChangeStart', () => NProgress.start());
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', () => NProgress.start());
    Router.events.off('routeChangeComplete', () => NProgress.done());
    Router.events.off('routeChangeError', () => NProgress.done());
  }

  render() {
    const {
      Component,
      pageProps,
      store,
      router,
      router: { pathname, route },
    } = this.props;
    const { title } = RouterType[pathname] || {};
    console.log(`store`, store.getState());
    const meta = store.getState().common.system.meta;
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <title>{meta.title || 'Next-Antd-Scaffold'}</title>
          <link
            rel="shortcut icon"
            href="/static/favicon.ico"
            type="image/ico"
          />
        </Head>
        <Container>
          <Provider store={store}>
            <Layout title={title} {...pageProps} route={route}>
              <Header title={title} {...pageProps} {...router} />
              <Component {...pageProps} router={router} />
              <GlobalStyle />
            </Layout>
          </Provider>
        </Container>
      </>
    );
  }
}

export default withRedux(createStore)(withReduxSaga({ async: true })(NextApp));

const GlobalStyle = createGlobalStyle`
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: ${color_nprogress};
    position: fixed;
    z-index: 999999999999;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }
`;
