import PropTypes from 'prop-types';
import { CenterContainer } from './../Container';
const UserDetail = ({ router, username }) => (
  <CenterContainer>
    <h1>Name：{router.query.username || username}</h1>
  </CenterContainer>
);

export default UserDetail;

UserDetail.propTypes = {
  router: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
};
