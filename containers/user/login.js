import { connect } from 'react-redux';
import { userLogin } from '../../redux/actions/user';
import UserLogin from '../../components/User/UserLogin';
import { bindActionCreators } from 'redux';
import { FormID } from '../../constants/ConstTypes';
import { stringToBoolean } from '../../core/util';

const mapStateToProps = state => {
  const submiting = stringToBoolean(`${state.common.form[FormID.login]}`);
  return { submiting };
};

const mapDispatchToProps = dispatch => ({
  userLogin: bindActionCreators(userLogin, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
