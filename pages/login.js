// import UserDetail from '../../components/User/UserDetail';
import UserLogin from '../components/User/UserLogin';

UserLogin.getInitialProps = async props => {
  const { isServer } = props.ctx;
  return { isServer, publicRoute: true };
};

export default UserLogin;
