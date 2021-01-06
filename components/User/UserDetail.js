import PropTypes from 'prop-types';

const UserDetail = ({ router, username }) => (
  <h1>Name：{router.query.username || username}</h1>
);

export default UserDetail;

UserDetail.propTypes = {
  router: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
};
