import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../models/User';
import Insight from '../models/Insight';

const models = [User, Insight];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
