// const API url
import getConfig from 'next/config';
const {
  publicRuntimeConfig: { API_SERVER },
} = getConfig();

export default {
  /**
   * Get user list
   * @method GET
   */
  getUserList: `${API_SERVER}/users`,
};
