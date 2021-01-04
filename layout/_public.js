import PropTypes from 'prop-types';
import Header from '../components/Header';
import { useEffect } from 'react';
import ErrorPage from '../components/Error/ErrorPage';
import logger from '../core/Logger';

const Public = ({ title, children, isAuthenticated, ...props }) => {
  useEffect(() => {
    logger.log(`layout-props`, props);
  }, []);
  return (
    <>
      <Header title={title} isAuthenticated={isAuthenticated} {...props} />
      <div className="content-container">
        {isAuthenticated ? <ErrorPage statusCode={403} /> : children}
      </div>
    </>
  );
};
Public.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  isAuthenticated: PropTypes.any,
};

Public.defaultProps = {
  title: '',
  children: null,
  isAuthenticated: false,
};

export default Public;
