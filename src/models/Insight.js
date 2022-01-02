import Sequelize, { Model } from 'sequelize';

export default class Insight extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    return this.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
  }
}
