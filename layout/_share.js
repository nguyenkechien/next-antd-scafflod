import PropTypes from 'prop-types';
import Header from '../components/Header';
import { useEffect } from 'react';
import logger from '../core/Logger';

const Share = ({ title, children, ...props }) => {
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

Share.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};

Share.defaultProps = {
  title: '',
  children: null,
};

export default Share;
