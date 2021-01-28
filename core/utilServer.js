const resType = {
  status: Number,
  message: Number,
  errors: null,
  result: null,
};
/**
 *
 * @param {resType} param0
 */

const resJson = ({
  status = 200,
  message = 'success',
  errors = null,
  result = null,
}) => ({ code: status, message, errors, result });

const getTokenHeader = (req = { headers: {} }, key = 'authorization') => {
  /**
   * @type {string}
   */
  const token = req.headers[key] || 'Bearer ';
  return token ? token.split('Bearer ').join('') : '';
};

module.exports = { resJson, resType, getTokenHeader };
