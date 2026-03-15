const {
  Medicine,
  Preparations,
  Medicine_trasactions,
} = require("../../db/models/index.js");

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

const getMedicineDashboard = async (opts = {}) => {
  const threshold = typeof opts.threshold === "number" ? opts.threshold : 5;

  const medicines = await Medicine.findAll({
    include: [
      { model: Preparations, as: "preparation", attributes: ["id", "name"] },
      {
        model: Medicine_trasactions,
        as: "transactions",
        attributes: ["id", "quantity", "given_by", "createdAt"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  const total = medicines.length;

  const lowStock = medicines
    .filter((m) => m.stock <= threshold)
    .map((m) => ({ id: m.id, name: m.name, stock: m.stock }));

  const byPreparation = medicines.reduce((acc, m) => {
    const p = (m.preparation && m.preparation.name) || "-";
    acc[p] = (acc[p] || 0) + 1;
    return acc;
  }, {});

  const latest = medicines.slice(0, 10).map((m) => ({
    id: m.id,
    name: m.name,
    stock: m.stock,
    preparation: m.preparation ? m.preparation.name : null,
    createdAt: m.createdAt,
  }));

  const transactionsCount = medicines.reduce(
    (acc, m) => acc + (m.transactions ? m.transactions.length : 0),
    0,
  );

  return {
    total,
    threshold,
    lowStock,
    byPreparation,
    latest,
    transactionsCount,
    medicines: medicines.map((m) => ({
      id: m.id,
      name: m.name,
      description: m.description,
      stock: m.stock,
      preparation: m.preparation
        ? { id: m.preparation.id, name: m.preparation.name }
        : null,
      transactions: m.transactions
        ? m.transactions.map((t) => ({
            id: t.id,
            quantity: t.quantity,
            given_by: t.given_by,
            createdAt: t.createdAt,
          }))
        : [],
      createdAt: m.createdAt,
    })),
  };
};

module.exports = {
  create,
  look,
  findPreparation,
  update,
  findMedicines,
  drop,
  getMedicineDashboard
};

