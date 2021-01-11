import UserList from '../../containers/user/list';
import { PrivateComponent } from '../../components/PrivateComponent';
import { fetchUserListData } from '../../redux/actions/user';

UserList.getInitialProps = async props => {
  const { store, isServer } = props.ctx;
  store.dispatch(fetchUserListData());
  return { isServer };
};

export default PrivateComponent(UserList);
