import UserLogin from '../containers/user/login';

UserLogin.getInitialProps = async props => {
  const { isServer } = props.ctx;
  return { isServer };
};

export default UserLogin;
