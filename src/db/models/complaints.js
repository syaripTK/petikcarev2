"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Complaints extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Complaints.belongsTo(models.User, {
        foreignKey: "santri_id",
        as: "santri",
      });
      Complaints.belongsTo(models.User, {
        foreignKey: "handled_by",
        as: "handler",
      });
      Complaints.hasMany(models.Medicine_trasactions, {
        foreignKey: "complaint_id",
        as: "medicine_transaction",
      });
    }
  }
  Complaints.init(
    {
      id: {
        type: DataTypes.UUID,

        allowNull: false,
        primaryKey: true,
      },
      santri_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("PENDING", "DIPROSES", "SELESAI"),
        defaultValue: "PENDING",
      },
      handled_by: {
        type: DataTypes.UUID,
      },
      handled_note: {
        type: DataTypes.TEXT,
      },
      handled_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Complaints",
      tableName: "complaints",
    },
  );
  return Complaints;
};
