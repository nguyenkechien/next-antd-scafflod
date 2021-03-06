import NavigationBar from '../components/NavigationBar';
import { connect } from 'react-redux';
import {
  PRIVATE,
  PRIVATE_ADMIN,
  PUBLIC,
  RoleType,
} from '../constants/ConstTypes';
import { bindActionCreators } from 'redux';
import { userLogout } from '../redux/actions/user';
import { toogleCollapse } from '../redux/actions/common';

const mapStateToProps = state => {
  const collapsed = state.common.common.collapsed;
  const header = state.common.system.header;
  const auth = state.user.auth;

  const isAuthenticated = auth.isAuthenticated;
  const role = auth.role;

  const menu = header.menu;
  const listMenu = Object.keys(menu)
    .map(item => Object.assign(menu[item], { href: item }))
    .map(item => {
      item.hidden =
        (!isAuthenticated && [PRIVATE, PRIVATE_ADMIN].includes(item.type)) ||
        (isAuthenticated &&
          (item.type === PUBLIC ||
            (item.type === PRIVATE_ADMIN && role !== RoleType[1])));

      return item;
    });
  return { listMenu, isAuthenticated, collapsed };
};

const mapDispatchToProps = dispatch => ({
  userLogout: bindActionCreators(userLogout, dispatch),
  toogleCollapsed: bindActionCreators(toogleCollapse, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
