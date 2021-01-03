import { connect } from 'react-redux';
import { userLogin } from '../../redux/actions/user';
import UserLogin from '../../components/User/UserLogin';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => ({ errors: state.auth });

const mapDispatchToProps = dispatch => ({
  userLogin: bindActionCreators(userLogin, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
