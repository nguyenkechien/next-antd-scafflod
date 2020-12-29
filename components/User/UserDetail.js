import PropTypes from 'prop-types';

const UserDetail = ({ router }) => <h1>Name：{router.query.username}</h1>;

export default UserDetail;

UserDetail.propTypes = {
  router: PropTypes.object.isRequired,
};
