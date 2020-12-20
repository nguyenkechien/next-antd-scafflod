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
import Router from 'next/router';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* NProgress styles. Make clicks pass-through */
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: #ff4e45;
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;

    width: 100%;
    height: 4px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #29d, 0 0 5px #29d;
    opacity: 1.0;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
            transform: rotate(3deg) translate(0px, -4px);
  }
`;

class NextApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  componentDidMount() {
    NProgress.configure({
      showSpinner: false,
    });

    Router.events.on('routeChangeStart', () => NProgress.start());
    // Router.events.on('routeChangeComplete', () => NProgress.done());
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
