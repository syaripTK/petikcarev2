"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Preparations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Preparations.hasMany(models.Medicine, {
        foreignKey: "preparation_id",
        as: "preparation",
      });
    }
  }
  Preparations.init(
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
    },
    {
      sequelize,
      modelName: "Preparations",
      tableName: "preparations",
      timestamps: false,
    },
  );
  return Preparations;
};
