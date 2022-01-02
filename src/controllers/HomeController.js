import Insight from '../models/Insight';
import User from '../models/User';

class HomeController {
  index(req, res) {
    res.render('home');
    console.log(req.session);
  }

  async dashboard(req, res) {
    try {
      const { userId } = req.session;

      const user = await User.findByPk(userId, {
        include: { association: 'insights' },
      });
      const insights = await Insight.findAll({ where: { user_id: userId } });

      if (!user) {
        req.flash('error', 'Usuário não existe!');
        req.session.save(() => {
          return res.redirect('/login');
        });
      }

      const userInsights = insights.map((result) => result.dataValues);

      let emptyInsights = false;

      if (userInsights.length === 0) {
        emptyInsights = true;
      }

      res.render('insights/dashboard', { userInsights, emptyInsights });
    } catch (e) {
      console.log(e);
    }
  }

  createInsights(req, res) {
    res.render('insights/create');
  }

  /** método responsável por renderizar a view de editar o insight */
  async updateInsight(req, res) {
    try {
      const { id } = req.params;

      const insight = await Insight.findOne({ where: { id }, raw: true });

      res.render('insights/edit', { insight });
    } catch (e) {
      console.log(e);
    }
  }

  /** método responsável por atualizar o insight */
  async update(req, res) {
    try {
      const { id, title } = req.body;

      const insight = { title };

      await Insight.update(insight, { where: { id } });

      req.flash('success', 'Insight editado com sucesso!');
      req.session.save(() => {
        return res.redirect('dashboard');
      });
    } catch (e) {
      console.log(e);
    }
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

  /** metodo responsável por deletar um insight */
  async delete(req, res) {
    try {
      const { id } = req.body;
      const { userId } = req.session;

      await Insight.destroy({ where: { id: id, user_id: userId } });
      req.flash('success', 'Insight removido com sucesso!');
      req.session.save(() => {
        return res.redirect('dashboard');
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new HomeController();
