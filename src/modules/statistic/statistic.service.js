const {
  Complaints,
  Medicine_trasactions,
  Medicine,
} = require("../../db/models/index.js");
const { Op, fn, col, literal, Sequelize } = require("sequelize");

const getSummary = async () => {
  const totalPending = await Complaints.count({ where: { status: "PENDING" } });
  const totalSelesai = await Complaints.count({ where: { status: "SELESAI" } });
  const totalDiproses = await Complaints.count({
    where: { status: "DIPROSES" },
  });
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const trendRows = await Complaints.findAll({
    attributes: [
      [Sequelize.fn("DATE", Sequelize.col("createdAt")), "date"],
      [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
    ],
    where: {
      createdAt: { [Op.gte]: sevenDaysAgo },
    },
    group: [Sequelize.fn("DATE", Sequelize.col("createdAt"))],
    order: [[Sequelize.fn("DATE", Sequelize.col("createdAt")), "ASC"]],
    raw: true,
  });

  const trend = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const row = trendRows.find((r) => r.date === key);
    trend.push({ date: key, count: row ? parseInt(row.count, 10) : 0 });
  }

  return { totalPending, totalDiproses, totalSelesai, trend };
};

const getTopMedicines = async (limit = 10) => {
  const rows = await Medicine_trasactions.findAll({
    attributes: [
      "medicine_id",
      [Sequelize.fn("SUM", Sequelize.col("quantity")), "total_used"],
    ],
    group: ["medicine_id"],
    order: [[Sequelize.literal("total_used"), "DESC"]],
    limit,
    raw: true,
  });

  const medicineIds = rows.map((r) => r.medicine_id);
  const medicines = await Medicine.findAll({ where: { id: medicineIds } });
  const byId = medicines.reduce((acc, m) => {
    acc[m.id] = { id: m.id, name: m.name, stock: m.stock };
    return acc;
  }, {});

  return rows.map((r) => ({
    medicine_id: r.medicine_id,
    name: byId[r.medicine_id] ? byId[r.medicine_id].name : null,
    stock: byId[r.medicine_id] ? byId[r.medicine_id].stock : null,
    total_used: parseInt(r.total_used, 10),
  }));
};

const getCommonComplaints = async (limit = 10) => {
  const rows = await Complaints.findAll({
    attributes: ["title"],
    limit: 500,
    order: [["createdAt", "DESC"]],
    raw: true,
  });

  const stopwords = new Set([
    "dan",
    "atau",
    "yang",
    "dengan",
    "ke",
    "di",
    "pada",
    "saat",
    "ini",
  ]);
  const counts = {};

  rows.forEach((r) => {
    if (!r.title) return;
    const tokens = r.title
      .toLowerCase()
      .replace(/[0-9]/g, "")
      .split(/[^\p{L}]+/u)
      .filter((t) => t && t.length > 2 && !stopwords.has(t));
    tokens.forEach((t) => (counts[t] = (counts[t] || 0) + 1));
  });

  const items = Object.entries(counts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);

  return items;
};

module.exports = { getSummary, getTopMedicines, getCommonComplaints };
