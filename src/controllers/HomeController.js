import Insight from '../models/Insight';

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

  /** método responsável por criar um insight */
  async store(req, res) {
    try {
      const { title } = req.body;
      const userId = req.session.userId;
      console.log(typeof userId);

      if (!userId) {
        req.flash('error', 'Usuário não existe!');
        req.session.save(() => {
          return res.redirect('add');
        });
      }

      const insight = {
        title,
        user_id: userId,
      };

      await Insight.create(insight);
      req.flash('success', 'Insight criado com sucesso!');
      req.session.save(() => {
        return res.redirect('dashboard');
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new HomeController();
