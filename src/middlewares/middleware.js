export const isLogged = (req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session;
  }

  next();
};
