import App, { Container } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '../redux/store';
import Layout from '../layout';
import '../assets/self-styles.less';
import NProgress from 'nprogress';
import { createGlobalStyle } from 'styled-components';
import { color_nprogress } from '../constants/CustomTheme';
import Router from 'next/router';
import logger from '../core/Logger';
import { closeCollapse, fetchSystemData } from '../redux/actions/common';
import { Auth } from '../core/Auth';
import { PUBLIC, SHARE } from '../constants/ConstTypes';
import ErrorPage from '../components/Error/ErrorPage';

class NextApp extends App {
  static async getInitialProps({ Component, ctx, router }) {
    let pageProps = {};
    const { pathname, store, isServer } = ctx;
    if (isServer) await fetchSystemData(store);

    const route = pathname;
    logger.log('\nroute: ', route, ',\n', router);
    const auth = await Auth.authOnServer(ctx);

    const state = store.getState();
    const { type, title } = state.common.system.header.menu[route] || {};
    const routerType = type || SHARE;
    pageProps = Object.assign(pageProps, { title });

    if (auth.isAuthenticated && routerType === PUBLIC) {
      return { pageProps: { ...pageProps, statusCode: 403 } };
    }

    const {
      getInitialProps,
      getServersideProps,
      getStaticProps,
      getStaticPaths,
    } = Component;

    const initialProps =
      getInitialProps && (await getInitialProps({ ctx, auth, routerType }));

    const serverProps =
      getServersideProps && (await getServersideProps({ ctx }));

    const staticProps = getStaticProps && (await getStaticProps({ ctx }));

    const staticPaths = getStaticPaths && (await getStaticPaths({ ctx }));

    pageProps = {
      ...pageProps,
      ...serverProps,
      ...staticProps,
      ...staticPaths,
      ...initialProps,
    };

    return { pageProps };
  }

  componentDidMount() {
    const { store } = this.props;

    const storeCloseCollapse = () => {
      const state = store.getState();
      const collapsed = state.common.common.collapsed;
      !collapsed && store.dispatch(closeCollapse());
    };

    NProgress.configure({ showSpinner: false });
    Router.events.on('routeChangeStart', () => {
      storeCloseCollapse();
      NProgress.start();
    });

    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', () => NProgress.start());
    Router.events.off('routeChangeComplete', () => NProgress.done());
    Router.events.off('routeChangeError', () => NProgress.done());
  }

  render() {
    const { Component, pageProps, store, router } = this.props;
    logger.log(`store`, store.getState());
    logger.log(`pageProps`, pageProps);
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
            <Layout title={pageProps.title} {...pageProps} {...router}>
              {pageProps.statusCode ? (
                <ErrorPage statusCode={pageProps.statusCode} />
              ) : (
                <Component {...pageProps} router={router} />
              )}
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
