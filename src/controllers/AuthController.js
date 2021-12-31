class AuthController {
  login(req, res) {
    res.render('auth/login');
  }

  register(req, res) {
    res.render('auth/register');
  }

  async authRegister(req, res) {
    try {
      const { name, email, password, confirmpassword } = req.body;

      if (password !== confirmpassword) {
        req.flash('success', 'As senha não conferem!');
        res.render('auth/register');
        return;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthController();
