import { Component } from 'react';
import PropTypes from 'prop-types';
import TemplateErrorPage from './_TemplateErrorPage';
import { errorStatus } from '../../constants/ConstTypes';

class ErrorPage extends Component {
  static propTypes = {
    statusCode: PropTypes.number,
  };
  static defaultProps = {
    statusCode: 200,
  };
  render() {
    let src,
      message = `The page is ${errorStatus[this.props.statusCode] ||
        'not found'}`;
    switch (this.props.statusCode) {
      case 200:
      case 404: {
        src = '/static/empty.png';
        break;
      }
      case 401:
      case 403: {
        src = '/static/unknown_error.png';
        break;
      }
      case 500:
      default:
        message = 'The page is error';
        src = '/static/unknown_error.png';
        break;
    }
    if (!src && !message) return null;
    return (
      <TemplateErrorPage
        message={message}
        src={src}
        statusCode={this.props.statusCode}
      />
    );
  }
}

export default ErrorPage;
