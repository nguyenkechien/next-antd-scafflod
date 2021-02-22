import { ApiStrapi } from '../../constants/ApiStrapi';
import { getAPIByToken } from '../services';
import { AuthenUser } from '../services/auth';
const { resJson, getTokenHeader } = require('../../core/utilServer');

const User = {
  async GetUsers(req, res) {
    const tokenClient = getTokenHeader(req);
    const users = await getAPIByToken({
      api: ApiStrapi.auth.users,
      token: tokenClient,
    });
    if (!users) {
      return res.json(resJson({ status: 401, message: `Unauthorized` }));
    }
    return res.json(resJson({ result: users }));
  },
  async SignIn(req, res) {
    if (!req.body) {
      return res.json(
        resJson({ status: 400, message: `Username and password is required.` }),
      );
    }
    const identifier = req.body.username,
      password = req.body.password;
    const account = await AuthenUser({ identifier, password });

    if (!account.jwt.length) {
      return res.json(
        resJson({ status: 404, message: `Username or password invalid.` }),
      );
    }
    return res.json(
      resJson({
        message: `Login Success`,
        result: {
          token: account.jwt,
          position: account.user.role.name,
        },
      }),
    );
  },
  async GetProfile(req, res) {
    const tokenClient = getTokenHeader(req);
    const me = await getAPIByToken({
      api: ApiStrapi.auth.me,
      token: tokenClient,
    });

    if (!me) {
      return res.json(resJson({ status: 401, message: `Invalid token.` }));
    }

    return res.json(
      resJson({
        result: {
          username: me.username,
          email: me.email,
          position: me.role.name,
        },
      }),
    );
  },
};

export default User;
