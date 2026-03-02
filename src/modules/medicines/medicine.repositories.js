const { Medicines } = require("../../db/models/index.js");

const create = async (body) => {
  return Medicines.create(body);
};

module.exports = {
  create,
};
