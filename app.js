import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import flash from 'express-flash';

const exphbs = require('express-handlebars');

dotenv.config();

import homeRoutes from './src/routes/homeRoutes';

import sessionOptions from './src/config/sessions';

import { isLogged } from './src/middlewares/middleware';

class App {
  constructor() {
    this.app = express();
    this.views();
    this.middlewares();
    this.routes();
  }

  views() {
    this.app.engine('handlebars', exphbs.engine());
    this.app.set('views', path.resolve(__dirname, 'src', 'views'));
    this.app.set('view engine', 'handlebars');
    this.app.use(express.static(path.resolve(__dirname, 'public')));
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(flash());
    this.app.use(sessionOptions);
    this.app.use(isLogged);
  }

  routes() {
    this.app.use('/', homeRoutes);
  }
}

export default new App().app;
