class HomeController {
  index(req, res) {
    res.render('home');
  }
}

export default new HomeController();
