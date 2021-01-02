import { Button } from 'antd';
import Router from 'next/router';
import PropTypes from 'prop-types';

const TemplateErrorPage = ({ message, src, statusCode }) => (
  <div className="content-container">
    <style jsx>{`
      .content-container {
        display: flex;
        width: 100%;
        height: 100%;
        min-height: calc(100vh - 100px);
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .error-image {
        width: 200px;
        height: 200px;
        margin: 10px 0;
      }
    `}</style>
    <img className="error-image" alt="error-img" src={src} />
    <h3>
      {message}| {statusCode}～
    </h3>
    <Button onClick={() => Router.push('/')} type="primary" ghost>
      Back Home
    </Button>
  </div>
);

export default TemplateErrorPage;

TemplateErrorPage.propTypes = {
  message: PropTypes.string,
  src: PropTypes.string,
  statusCode: PropTypes.number,
};

TemplateErrorPage.defaultProps = {
  message: 'The page is not found',
  src: '/static/empty.png',
  statusCode: 404,
};
