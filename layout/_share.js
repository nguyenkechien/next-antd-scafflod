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
      <style jsx>{`
        .content-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 70px 20px 20px 20px;
          padding: 10px 20px;
          background-color: #fff;
        }
      `}</style>
      <Header title={title} />
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
