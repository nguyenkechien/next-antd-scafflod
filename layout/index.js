import PropTypes from 'prop-types';
import { ContentContainer } from '../components/Container';
import Header from '../containers/Header';

const Layout = ({ children, ...props }) => (
  <>
    <Header {...props} />
    <ContentContainer>{children}</ContentContainer>
  </>
);
export default Layout;

Layout.propTypes = {
  children: PropTypes.any,
};

Layout.defaultProps = {
  children: null,
};
