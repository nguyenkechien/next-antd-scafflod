import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <div className="content-container">{children}</div>
);
export default Layout;

Layout.propTypes = {
  children: PropTypes.any,
};

Layout.defaultProps = {
  children: null,
};
