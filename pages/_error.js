import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from '../components/Error/ErrorPage';
export default class Error extends React.Component {
  static propTypes = {
    statusCode: PropTypes.number,
  };
  static defaultProps = {
    statusCode: 200,
  };
  // eslint-disable-next-line react/sort-comp
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 500;
    return { statusCode };
  }

  render() {
    return <ErrorPage statusCode={this.props.statusCode || 200} />;
  }
}
