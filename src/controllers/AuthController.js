import User from '../models/User';
import validator from 'validator';
import bcrypt from 'bcryptjs';

class AuthController {
  login(req, res) {
    res.render('auth/login');
  }

  register(req, res) {
    res.render('auth/register');
  }

  async authRegister(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    /** verificar as senhas */
    if (password !== confirmpassword) {
      req.flash('error', 'As senha não conferem!');
      req.session.save(() => {
        return res.render('auth/register');
      });
      return;
    }

    /** verificar se os campos foram preenchidos */
    if (!name) {
      req.flash('error', 'O campo nome não podem estár em vazios!');
      req.session.save(() => {
        return res.render('auth/register');
      });
      return;
    }

    /** verificar se o email é válido */
    if (!validator.isEmail(email)) {
      req.flash('error', 'Email inválido!');
      req.session.save(() => {
        return res.render('auth/register');
      });
      return;
    }

    /** verificar se o usuário existe */
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      req.flash('error', 'Email já existe!');
      req.session.save(() => {
        return res.render('auth/register');
      });

      return;
    }

    /** gerar o hash da senha */
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    /** criar um objeto de usuário */
    const user = {
      name,
      email,
      password: passwordHash,
    };

    /** criar usuário no sistema */
    try {
      await User.create(user);

      req.flash('success', 'Cadastro realizado com sucesso!');
      req.session.save(() => {
        return res.redirect('/');
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthController();
