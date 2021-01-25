import { connect } from 'react-redux';
import { fetchUserListData } from '../../redux/actions/user';
import UserList from '../../components/User/UserList';
import { createLoadingSelector } from '../../redux/actions/common';
import { FETCH_USER_LIST } from '../../constants/ActionTypes';

const mapStateToProps = state => {
  const isLoading = createLoadingSelector([FETCH_USER_LIST])(state);

  return {
    list: state.user.list.list,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUserListData: () => dispatch(fetchUserListData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
