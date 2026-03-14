"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Medicine_trasactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Medicine_trasactions.belongsTo(models.Medicine, {
        foreignKey: "medicine_id",
        as: "medicine",
      });
      Medicine_trasactions.belongsTo(models.Complaints, {
        foreignKey: "complaint_id",
        as: "complaint",
      });
      Medicine_trasactions.belongsTo(models.User, {
        foreignKey: "given_by",
        as: "given_transactions",
      });
    }
  }
  Medicine_trasactions.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      medicine_id: {
        type: DataTypes.UUID,
      },
      complaint_id: {
        type: DataTypes.UUID,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      given_by: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "Medicine_trasactions",
      tableName: "medicine_trasactions",
    },
  );
  return Medicine_trasactions;
};
