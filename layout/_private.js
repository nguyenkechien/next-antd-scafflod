import PropTypes from 'prop-types';
import { useEffect } from 'react';
import logger from '../core/Logger';

const Private = ({ children, ...props }) => {
  useEffect(() => {
    logger.log(`layout-props`, props);
  }, []);

  return (
    <>
      <div className="content-container">{children}</div>
    </>
  );
};

Private.propTypes = {
  children: PropTypes.any,
};

Private.defaultProps = {
  children: null,
};

export default Private;
