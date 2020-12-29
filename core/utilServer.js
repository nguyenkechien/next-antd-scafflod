// eslint-disable-next-line no-unused-vars
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

module.exports = { resJson };
