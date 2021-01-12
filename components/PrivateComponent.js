import { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorPage from './Error/ErrorPage';
import { redirectToLogin } from '../core/util';
import {
  PRIVATE_ADMIN,
  PUBLIC,
  RoleType,
  SHARE,
} from '../constants/ConstTypes';

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
        return { ...wrappedProps, isAuthenticated, routerType, role };
      }
      return initialProps;
    }

    render() {
      const {
        isAuthenticated,
        routerType,
        role,
        ...propsWithoutAuth
      } = this.props;
      console.log(PRIVATE_ADMIN, routerType === PRIVATE_ADMIN);
      console.log(role, role === RoleType[1]);
      if (
        isAuthenticated &&
        (routerType === PUBLIC ||
          (routerType === PRIVATE_ADMIN && role !== RoleType[1]))
      ) {
        return (
          <ErrorPage
            statusCode={403}
            message="Please log out to view the page"
          />
        );
      }

      return <WrappedComponent {...propsWithoutAuth} />;
    }
  };
};
