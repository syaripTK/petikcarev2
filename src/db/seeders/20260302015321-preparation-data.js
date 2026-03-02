"use strict";
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "preparations",
      [
        {
          id: uuidv4(),
          name: "Tablet",
        },
        {
          id: uuidv4(),
          name: "Pil",
        },
        {
          id: uuidv4(),
          name: "Kapsul",
        },
        {
          id: uuidv4(),
          name: "Suppositoria",
        },
        {
          id: uuidv4(),
          name: "Ovula",
        },
        {
          id: uuidv4(),
          name: "Salep",
        },
        {
          id: uuidv4(),
          name: "Krim",
        },
        {
          id: uuidv4(),
          name: "Gel",
        },
        {
          id: uuidv4(),
          name: "Sirup",
        },
        {
          id: uuidv4(),
          name: "Suspensi",
        },
        {
          id: uuidv4(),
          name: "Infus",
        },
        {
          id: uuidv4(),
          name: "Injeksi",
        },
        {
          id: uuidv4(),
          name: "Obat tetes",
        },
        {
          id: uuidv4(),
          name: "Emulsi",
        },
        {
          id: uuidv4(),
          name: "Aerosol",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("preparations", null, {});
  },
};
