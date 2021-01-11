import UserLogin from '../containers/user/login';

UserLogin.getInitialProps = async props => {
  const { isServer } = props.ctx;
  return { isServer };
};

UserLogin.getServerSideProps = async context => {
  console.log(`context`, context);
  return { props: {} };
};

export default UserLogin;
