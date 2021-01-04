import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ErrorPage from '../components/Error/ErrorPage';
import Header from '../containers/Header';
import logger from '../core/Logger';

const Public = ({ children, isAuthenticated, ...props }) => {
  useEffect(() => {
    logger.log(`layout-props`, props);
  }, []);
  return (
    <>
      <div className="content-container">
        {isAuthenticated ? (
          <>
            <Header {...props} />
            <ErrorPage statusCode={403} />
          </>
        ) : (
          children
        )}
      </div>
    </>
  );
};
Public.propTypes = {
  children: PropTypes.any,
  isAuthenticated: PropTypes.any,
};

Public.defaultProps = {
  children: null,
  isAuthenticated: false,
};

export default Public;
