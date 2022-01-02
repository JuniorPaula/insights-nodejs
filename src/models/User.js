import Sequelize, { Model } from 'sequelize';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    return this.hasMany(models.Insight, {
      foreignKey: 'user_id',
      as: 'insights',
    });
  }
}
