import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

import homeRoutes from './src/routes/homeRoutes';

class App {
  constructor() {
    this.app = express();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
  }
}

export default new App().app;
