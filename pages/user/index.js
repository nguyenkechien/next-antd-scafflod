// eslint-disable-next-line no-unused-vars
import React from 'react';
import { withPrivateComponent } from '../../components/PrivateComponent';

const UserPage = () => <>The user index page</>;

UserPage.getInitialProps = async props => {
  const { isServer } = props.ctx;
  return { isServer };
};

export default withPrivateComponent(UserPage);
