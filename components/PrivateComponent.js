import { Component } from 'react';
import PropTypes from 'prop-types';
import { redirectToLogin } from '../core/Auth';
import { PRIVATE_ADMIN, RoleType, SHARE } from '../constants/ConstTypes';

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
      routerType,
    }) {
      const initialProps = { isAuthenticated, role };

      if (!isAuthenticated) return redirectToLogin(ctx);

      if (routerType === PRIVATE_ADMIN && role !== RoleType[1]) {
        return { ...initialProps, statusCode: 401 };
      }

      if (WrappedComponent.getInitialProps) {
        const wrappedProps = await WrappedComponent.getInitialProps({ ctx });
        return { ...wrappedProps, ...initialProps };
      }
      return initialProps;
    }

    render() {
      const { ...propsWithoutAuth } = this.props;
      return <WrappedComponent {...propsWithoutAuth} />;
    }
  };
};
