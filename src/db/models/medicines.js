"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Medicines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Medicines.belongsTo(models.Preparations, {
        foreignKey: "preparation_id",
        as: "preparation",
      });
      Medicines.hasMany(models.Medicine_transactions, {
        foreignKey: "medicine_id",
        as: "transactions",
      });
    }
  }
  Medicines.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      preparation_id: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "Medicines",
      tableName: "medicines",
    },
  );
  return Medicines;
};
