function userMiddleware(req, _, next) {
  req.locals = { ...req.locals, user: req.headers["x-user"] };
  next();
}

module.exports = {
  userMiddleware,
};
