import PropTypes from 'prop-types';
import Header from '../components/Header';
import { useEffect } from 'react';
import { Auth } from '../core/util';
import logger from '../core/Logger';

const Private = ({ title, children, ...props }) => {
  useEffect(() => {
    logger.log(`layout-props`, props);
    Auth.authOnClient(props);
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

Private.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};

Private.defaultProps = {
  title: '',
  children: null,
};

export default Private;
