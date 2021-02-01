import FormSubmit from '../components/Form';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  console.log(state);
  return {};
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FormSubmit);
