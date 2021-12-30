class HomeController {
  index(req, res) {
    res.send('ola mundo!');
  }
}

export default new HomeController();
