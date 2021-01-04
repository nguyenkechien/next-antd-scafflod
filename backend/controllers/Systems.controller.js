const { resJson } = require('../../core/utilServer');

const RouterType = {
  home: {
    title: 'Home',
    type: 'SHARE',
    href: '/',
  },
  userList: {
    title: 'User List',
    type: 'PRIVATE',
    href: '/user/list',
  },
  userDetail: {
    title: 'User Detail',
    type: 'PRIVATE',
    href: '/user/detail',
  },
  login: {
    title: 'Login',
    type: 'PUBLIC',
    href: '/login',
  },
};

class Systems {
  static GetAll(req, res) {
    return res.json(
      resJson({
        result: {
          header: RouterType,
        },
      }),
    );
  }
}

module.exports = Systems;
