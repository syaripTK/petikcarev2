"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Complaints, {
        foreignKey: "santri_id",
        as: "complaints",
      });
      User.hasMany(models.Notifications, {
        foreignKey: "user_id",
        as: "notification",
      });
      User.hasOne(models.Refresh_token, {
        foreignKey: "user_id",
        as: "refresh_token",
      });
      User.hasMany(models.Medicine_trasactions, {
        foreignKey: "given_by",
        as: "given_transactions",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("santri", "pengasuhan", "admin"),
        defaultValue: "santri",
        allowNull: false,
      },
      kamar: {
        type: DataTypes.STRING(25),
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      freezeTableName: true,
    },
  );
  return User;
};
