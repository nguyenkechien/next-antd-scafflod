import { connect } from 'react-redux';
import { PRIVATE, PUBLIC } from '../constants/ConstTypes';
import { bindActionCreators } from 'redux';
import { userLogout } from '../redux/actions/user';
import Header from '../components/Header';

const mapStateToProps = state => {
  const header = state.common.system.header;
  const isAuthenticated = state.user.auth.isAuthenticated;
  const nav = Object.keys(header)
    .map(item => header[item])
    .map(item => {
      console.log(item.title, item.type === PUBLIC && isAuthenticated);
      item.hidden =
        (item.type === PRIVATE && !isAuthenticated) ||
        (item.type === PUBLIC && isAuthenticated);
      return item;
    });
  return {
    nav,
    isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => ({
  userLogout: bindActionCreators(userLogout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
