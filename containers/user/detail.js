import { connect } from 'react-redux';
import UserDetail from '../../components/User/UserDetail';

const mapStateToProps = state => ({
  username: state.user.auth.username || '',
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
