// const API url
import getConfig from 'next/config';
const {
  publicRuntimeConfig: { API_SERVER },
} = getConfig();

export default {
  User: {
    /**
     * Get user list
     * @method GET
     */
    getUserProfile: `${API_SERVER}/users/profile`,
    /**
     * Get user list
     * @method GET
     */
    getUserList: `${API_SERVER}/users`,
    /**
     * Get user list
     * @method POST
     */
    login: `${API_SERVER}/users/login`,
  },
  System: {
    /**
     * Get System list
     * @method GET
     */
    getAll: `${API_SERVER}/system/all`,
  },
};
