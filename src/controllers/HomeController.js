class HomeController {
  index(req, res) {
    res.render('home');
    console.log(req.session);
  }

  dashboard(req, res) {
    res.render('insights/dashboard');
  }

  createInsights(req, res) {
    res.render('insights/create');
  }
}

export default new HomeController();
