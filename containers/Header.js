import { connect } from 'react-redux';
import { PRIVATE, PUBLIC } from '../constants/ConstTypes';
import { bindActionCreators } from 'redux';
import { userLogout } from '../redux/actions/user';
import Header from '../components/Header';
import { createLoadingSelector } from '../redux/actions/common';
import { FETCH_SYSTEM } from '../constants/ActionTypes';

const mapStateToProps = state => {
  const header = state.common.system.header;
  const isAuthenticated = state.user.auth.isAuthenticated;
  const nav = Object.keys(header)
    .map(item => header[item])
    .map(item => {
      item.hidden =
        (item.type === PRIVATE && !isAuthenticated) ||
        (item.type === PUBLIC && isAuthenticated);
      return item;
    });
  const isLoading = createLoadingSelector([FETCH_SYSTEM])(state);
  return {
    nav,
    isAuthenticated,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  userLogout: bindActionCreators(userLogout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
