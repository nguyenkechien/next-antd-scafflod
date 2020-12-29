import App, { Container } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '../redux/store';
import Layout from '../components/Layout';
import { RouterTitle } from '../constants/ConstTypes';
import '../assets/self-styles.less';
import NProgress from 'nprogress';
import { createGlobalStyle } from 'styled-components';
import { color_primary } from '../constants/CustomTheme';
import Router from 'next/router';
import { Auth } from '../core/util';
const GlobalStyle = createGlobalStyle`
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: ${color_primary};
    position: fixed;
    z-index: 999999999999;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }
`;

class NextApp extends App {
  static redirectToLogin(ctx) {
    const { req, res } = ctx;
    if (req) {
      res.writeHead(302, {
        Location: `/login?next=${req.url}`, // => to /login page
      });
      res.end();
      return;
    }
    Router.push(`/login?next=`);
    return;
  }
  static async getInitialProps({ Component, ctx, router }) {
    let pageProps = {
      publicRoute: true,
    };

    const token = await Auth.getAuthTokenOnServer(ctx);
    console.log(`token`, token);
    const route = (router && router.route) || '';
    console.log('router: ', router, '\nroute:', route);

    const isAuthenticated = token && token.length > 0;
    if (Component.getInitialProps) {
      const initProps = await Component.getInitialProps({ ctx });
      pageProps = { ...pageProps, ...initProps };
    }
    console.log(pageProps);
    console.log(`pageProps`, pageProps);

    return { pageProps, isAuthenticated };
  }

  componentDidMount() {
    NProgress.configure({
      showSpinner: false,
    });
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
    const { Component, pageProps, store, router } = this.props;
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
          <style jsx global>
            {`
              * {
                margin: 0;
                padding: 0;
              }
              body {
                font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei',
                  Arial, sans-serif;
                position: relative;
              }
            `}
          </style>
        </Head>
        <Container>
          <Provider store={store}>
            <Layout title={RouterTitle[router.pathname]}>
              <GlobalStyle />
              <Component {...pageProps} router={router} />
            </Layout>
          </Provider>
        </Container>
      </>
    );
  }
}

export default withRedux(createStore)(withReduxSaga({ async: true })(NextApp));
