import PropTypes from 'prop-types';
import Header from '../components/Header';
import { useEffect } from 'react';
// import { Auth } from '../core/util';
import logger from '../core/Logger';

const Private = ({ title, children, ...props }) => {
  useEffect(() => {
    logger.log(`layout-props`, props);
  }, []);

  return (
    <>
      <Header title={title} {...props} />
      <div className="content-container">{children}</div>
    </>
  );
};

Private.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};

Private.defaultProps = {
  title: '',
  children: null,
};

export default Private;
