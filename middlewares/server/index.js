export const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(error => {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
    next;
  });
};
