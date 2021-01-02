import App, { Container } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '../redux/store';
import Layout from '../layout';
import { PRIVATE, RouterType } from '../constants/ConstTypes';
import '../assets/self-styles.less';
import NProgress from 'nprogress';
import { createGlobalStyle } from 'styled-components';
import { color_nprogress } from '../constants/CustomTheme';
import Router from 'next/router';
import { Auth } from '../core/util';
import logger from '../core/Logger';

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

class NextApp extends App {
  static async getInitialProps({ Component, ctx, router }) {
    let pageProps = {};

    const route = (router && router.route) || '';
    const routerType = RouterType[route] && RouterType[route].type;
    logger.log('\nroute: ', route, '\nroute type: ', routerType, '\n', router);
    if (routerType === PRIVATE && ctx.req) Auth.authOnServer(ctx);

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
            <Layout type={type} title={title} {...router}>
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
