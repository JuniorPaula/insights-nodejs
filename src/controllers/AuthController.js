class AuthController {
  login(req, res) {
    res.render('auth/login');
  }

  register(req, res) {
    res.render('auth/register');
  }
}

export default new AuthController();
