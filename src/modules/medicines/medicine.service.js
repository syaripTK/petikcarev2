const { Medicine, Preparations } = require("../../db/models/index.js");

const create = async (body) => {
  return await Medicine.create(body);
};

const look = async () => {
  return await Medicine.findAll();
};

const findPreparation = async (name) => {
  return await Preparations.findOne({
    where: { name },
  });
};

const findMedicines = async (id) => {
  return await Medicine.findByPk(id);
};

const update = async (id, body) => {
  const data = await findMedicines(id);
  await data.update(body);
  return data;
};

const drop = async (id) => {
  return await Medicine.destroy({
    where: { id },
  });
};

module.exports = {
  create,
  look,
  findPreparation,
  update,
  findMedicines,
  drop,
};
