export const resType = {
  status: Number,
  message: Number,
  errors: null,
  result: null,
};
/**
 *
 * @param {resType} param0
 */
export const resJson = ({
  status = 200,
  message = 'Success',
  errors = null,
  result = null,
}) => ({ code: status, message, errors, result });

/**
 *
 * @param {Request} req
 * @param {String} key
 */
export const getTokenHeader = (req, key = 'authorization') => {
  /**
   * @type {string}
   */
  const token = req.headers[key] || 'Bearer ';
  return token ? token.split('Bearer ').join('') : '';
};
