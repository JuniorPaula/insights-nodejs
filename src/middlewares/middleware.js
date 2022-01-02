export const isLogged = (req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session;
  }

  next();
};

export const checkIsLogged = (req, res, next) => {
  const userId = req.session.userId;

  if (!userId) {
    req.flash('error', 'Você precisa está logado!');
    res.redirect('/login');
  }

  next();
};
