import { withPrivateComponent } from '../../components/PrivateComponent';
import UserDetail from '../../containers/User/detail';

UserDetail.getInitialProps = async props => {
  const { isServer } = props.ctx;
  return { isServer };
};

export default withPrivateComponent(UserDetail);
