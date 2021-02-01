import FormSubmit from '../components/Form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startSubmit } from '../redux/actions/common';

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  startSubmit: bindActionCreators(startSubmit, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSubmit);
