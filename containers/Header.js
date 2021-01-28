import { connect } from 'react-redux';
import Header from '../components/Header';
import { createLoadingSelector } from '../redux/actions/common';
import { FETCH_SYSTEM } from '../constants/ActionTypes';

const mapStateToProps = state => {
  const header = state.common.system.header;
  const logo = header.logo;
  const isLoading = createLoadingSelector([FETCH_SYSTEM])(state);
  return { logo, isLoading };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
