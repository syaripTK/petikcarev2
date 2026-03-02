"use strict";
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const bcrypt = require("bcrypt");
    const hashed = await bcrypt.hash("admin123", 10);
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: uuidv4(),
          name: "administrator",
          email: "admin@gmail.com",
          password: hashed,
          role: "admin",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
