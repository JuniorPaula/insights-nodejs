class HomeController {
  index(req, res) {
    res.render('home');
  }

  dashboard(req, res) {
    res.render('dashboard');
  }
}

export default new HomeController();
