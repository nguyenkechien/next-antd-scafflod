import PropTypes from 'prop-types';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { Auth } from '../core/util';
import ErrorPage from '../components/Error/ErrorPage';
import logger from '../core/Logger';

const Public = ({ title, children, ...props }) => {
  const [isAuth, setAuth] = useState(Auth.isAuthenticated);
  useEffect(() => {
    logger.log(`layout-props`, props);
    const { isAuthenticated } = Auth.authOnClient();
    if (!isAuth && isAuthenticated) setAuth(isAuthenticated);
  }, []);
  return (
    <>
      <Header title={title} />
      <div className="content-container">
        {isAuth ? <ErrorPage statusCode={403} /> : children}
      </div>
    </>
  );
};
Public.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};

Public.defaultProps = {
  title: '',
  children: null,
};

export default Public;
