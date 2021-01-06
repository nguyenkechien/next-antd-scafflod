import PropTypes from 'prop-types';
import { useEffect } from 'react';
import logger from '../core/Logger';

const Public = ({ children, ...props }) => {
  useEffect(() => {
    logger.log(`layout-props`, props);
  }, []);
  return (
    <>
      <div className="content-container">{children}</div>
    </>
  );
};
Public.propTypes = {
  children: PropTypes.any,
};

Public.defaultProps = {
  children: null,
};

export default Public;
