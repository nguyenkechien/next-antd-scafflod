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

const Systems = {
  GetAll(req, res) {
    return res.json(
      resJson({
        result: {
          meta: {
            title: 'Next-Antd-Scaffold-Server',
            keyword: 'Next-Antd-Scaffold',
            description: 'Next-Antd-Scaffold',
          },
          header: RouterType,
        },
      }),
    );
  },
};

export default Systems;
