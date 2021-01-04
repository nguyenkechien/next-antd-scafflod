import PropTypes from 'prop-types';
import { useEffect } from 'react';
import logger from '../core/Logger';

const Share = ({ children, ...props }) => {
  useEffect(() => {
    logger.log(`layout-props`, props);
  }, []);
  return (
    <>
      <div className="content-container">{children}</div>
    </>
  );
};

Share.propTypes = {
  children: PropTypes.any,
};

Share.defaultProps = {
  children: null,
};

export default Share;
