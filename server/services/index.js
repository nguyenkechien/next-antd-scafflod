import { http } from '../../core/http';

/**
 *
 * @param {{api: String, token: String}} param0
 * @returns {Promise<Object | null>}
 */
export const getAPIByToken = async ({ token, api }) => {
  try {
    const res = await http.get(api, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.statusCode && res.statusCode >= 400 ? null : res;
  } catch (error) {
    console.log(`error`, error);
  }
};
