import App, { Container } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '../redux/store';
import Layout from '../layout';
import { PRIVATE, PUBLIC, RouterType } from '../constants/ConstTypes';
import '../assets/self-styles.less';
import NProgress from 'nprogress';
import { createGlobalStyle } from 'styled-components';
import { color_nprogress } from '../constants/CustomTheme';
import Router from 'next/router';
import { Auth } from '../core/util';
import logger from '../core/Logger';
import { fetchSystemData } from '../redux/actions/common';
import Header from '../containers/Header';
import { fetchUserProfile } from '../redux/actions/user';
class NextApp extends App {
  static redirectToLogin(ctx) {
    const { req, res, asPath } = ctx;
    if (res) {
      res.writeHead(302, { Location: `${Auth.redirectTo}?next=${req.url}` });
      res.end();
    } else {
      const next = asPath ? `?next=${asPath}` : '';
      Router.push(`${Auth.redirectTo}${next}`);
    }
  }
  static async getInitialProps({ Component, ctx, router }) {
    let pageProps = {};
    const { pathname, store, isServer } = ctx;

    let { isAuthenticated, token } = Auth.authOnServer(ctx);
    pageProps = { ...pageProps, isAuthenticated };

    const route = pathname;
    const routerType = RouterType[route] && RouterType[route].type;
    logger.log('\nroute: ', route, '\nroute type: ', routerType, '\n', router);

    if ([PRIVATE, PUBLIC].includes(routerType)) {
      if (!isAuthenticated && routerType === PRIVATE) this.redirectToLogin(ctx);
      if (!isAuthenticated) return { pageProps };
    }

    if (isServer) {
      store.dispatch(fetchUserProfile(token));
      store.dispatch(fetchSystemData());
    }

    if (Component.getInitialProps) {
      const initProps = await Component.getInitialProps({ ctx });
      pageProps = { ...pageProps, ...initProps };
    }

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
      router: { pathname },
    } = this.props;
    const { title, type } = RouterType[pathname] || {};
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <title>Next-Antd-Scaffold</title>
          <link
            rel="shortcut icon"
            href="/static/favicon.ico"
            type="image/ico"
          />
        </Head>
        <Container>
          <Provider store={store}>
            <Layout type={type} title={title} {...pageProps} {...router}>
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
