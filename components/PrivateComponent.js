import { Component } from 'react';
import PropTypes from 'prop-types';
import { redirectToLogin } from '../core/util';
import { PRIVATE_ADMIN, RoleType, SHARE } from '../constants/ConstTypes';
import ErrorPage from './Error/ErrorPage';

export const withPrivateComponent = WrappedComponent => {
  return class extends Component {
    static propTypes = {
      routerType: PropTypes.string,
      role: PropTypes.string,
      isAuthenticated: PropTypes.bool,
    };
    static defaultProps = {
      routerType: SHARE,
      role: RoleType[10],
      isAuthenticated: false,
    };

    // eslint-disable-next-line react/sort-comp
    static async getInitialProps({
      ctx,
      auth: { isAuthenticated, role },
      route,
    }) {
      const itemMenu = ctx.store.getState().common.system.header.menu[route];
      const routerType = itemMenu ? itemMenu.type : SHARE;
      const initialProps = { ctx, routerType, isAuthenticated, role };

      if (!isAuthenticated) {
        redirectToLogin(ctx);
        return initialProps;
      }

      if (routerType === PRIVATE_ADMIN && role !== RoleType[1]) {
        WrappedComponent.getInitialProps = async () => ({});
        isAuthenticated = false;
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

      return !isAuthenticated ? (
        <ErrorPage statusCode={401} />
      ) : (
        <WrappedComponent {...propsWithoutAuth} />
      );
    }
  };
};
