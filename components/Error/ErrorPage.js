import { Component } from 'react';
import PropTypes from 'prop-types';
import TemplateErrorPage from './_TemplateErrorPage';

class ErrorPage extends Component {
  static propTypes = {
    statusCode: PropTypes.number,
  };
  static defaultProps = {
    statusCode: 200,
  };
  render() {
    let statusCode, src, message;
    switch (this.props.statusCode) {
      case 200:
      case 404: {
        message = 'The page is not found';
        src = '/static/empty.png';
        statusCode = 404;
        break;
      }
      case 403: {
        message = 'The page is forbidden';
        src = '/static/empty.png';
        statusCode = 403;
        break;
      }
      case 500: {
        message = 'The page is error';
        src = '/static/unknown_error.png';
        statusCode = 500;
        break;
      }
      default:
        break;
    }
    if (!statusCode && !src && !message) return null;
    return (
      <TemplateErrorPage message={message} src={src} statusCode={statusCode} />
    );
  }
}

export default ErrorPage;
