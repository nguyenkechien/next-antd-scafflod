import { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from './Error/ErrorPage';
import { redirectToLogin } from '../core/util';

export const PrivateComponent = WrappedComponent => {
  return class extends Component {
    static propTypes = {
      forbidden: PropTypes.bool,
      isAuthenticated: PropTypes.bool,
    };
    static defaultProps = { forbidden: false, isAuthenticated: false };

    // eslint-disable-next-line react/sort-comp
    static async getInitialProps({
      ctx,
      auth: { isAuthenticated, role },
      routerType,
    }) {
      const initialProps = { ctx };
      console.log('routerType', routerType);
      console.log('role', role);
      if (!isAuthenticated) {
        redirectToLogin(ctx);
        return { initialProps, isAuthenticated };
      }

      if (WrappedComponent.getInitialProps) {
        const wrappedProps = await WrappedComponent.getInitialProps(
          initialProps,
        );
        return { ...wrappedProps, isAuthenticated };
      }
      return initialProps;
    }

    render() {
      const { isAuthenticated, ...propsWithoutAuth } = this.props;

      isAuthenticated && (
        <ErrorPage statusCode={403} message="Please log out to view the page" />
      );

      return <WrappedComponent {...propsWithoutAuth} />;
    }
  };
};
