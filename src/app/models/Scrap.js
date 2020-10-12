import Sequelize, { Model } from 'sequelize';

class Scrap extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        tytle: Sequelize.STRING,
        message: Sequelize.STRING,
        user_id: {
          type: Sequelize.UUID,
          references: {
            model: 'users',
            key: 'id',
          },
        },
      },
      {
        sequelize,
      }
    );
    return this; // retorna a classe
  }

  static associate(models) {
    this.belongsTo(models.User); // relação co a tabela de usuario
  }
}

export default Scrap;
