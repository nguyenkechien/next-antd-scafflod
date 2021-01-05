import UserLogin from '../containers/user/login';

UserLogin.getInitialProps = async (props: { ctx: { isServer: Boolean; }; }) => {
  const { isServer } = props.ctx;
  return { isServer };
};

export default UserLogin;
