import { connect } from 'react-redux';
import { fetchUserListData } from '../../redux/actions/user';
import UserLogin from '../../components/User/UserLogin';

const mapStateToProps = state => ({
  errors: state.auth,
});

const mapDispatchToProps = dispatch => ({
  fetchUserLoginData: () => dispatch(fetchUserListData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
