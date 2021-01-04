import PropTypes from 'prop-types';
import Private from './_private';
import Share from './_share';
import Public from './_public';
import { PUBLIC, PRIVATE, SHARE } from '../constants/ConstTypes';

const Layout = ({ type, children, ...props }) => {
  switch (type) {
    case PRIVATE:
      return <Private {...props}>{children}</Private>;
    case PUBLIC:
      return <Public {...props}>{children}</Public>;
    case SHARE:
      return <Share {...props}>{children}</Share>;
    default:
  }
};
Layout.Private = Private;
Layout.Share = Share;
Layout.Public = Public;

export default Layout;

Layout.propTypes = {
  type: PropTypes.string,
  children: PropTypes.any,
};

Layout.defaultProps = {
  type: SHARE,
  children: null,
};
