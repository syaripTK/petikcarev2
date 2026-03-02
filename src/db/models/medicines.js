"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Medicine.belongsTo(models.Preparations, {
        foreignKey: "preparation_id",
        as: "preparation",
      });
      Medicine.hasMany(models.Medicine_trasactions, {
        foreignKey: "medicine_id",
        as: "transactions",
      });
    }
  }
  Medicine.init(
    {
      id: {
        type: DataTypes.UUID,
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
      modelName: "Medicine",
      tableName: "medicines",
      freezeTableName: true,
    },
  );
  return Medicine;
};
