const { User } = require("../../db/models/index.js");

const create = async (body) => {
  return await User.create(body);
};

const findId = async (id) => {
  return await User.findByPk(id);
};

const lookup = async () => {
  return await User.findAll();
};

const remove = async (id) => {
  return await User.destroy({
    where: { id },
  });
};

const update = async (id, body) => {
  const user = await findId(id);
  await user.update(body);
  return user;
};

const getUserDashboard = async () => {
  const users = await User.findAll({
    attributes: ["id", "name", "email", "role", "kamar", "createdAt"],
    order: [["createdAt", "DESC"]],
  });

  const total = users.length;

  const byRole = users.reduce((acc, u) => {
    const r = u.role || "unknown";
    acc[r] = (acc[r] || 0) + 1;
    return acc;
  }, {});

  const byKamar = users.reduce((acc, u) => {
    const k = u.kamar || "-";
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});

  const latest = users.slice(0, 10).map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    kamar: u.kamar,
    createdAt: u.createdAt,
  }));

  return {
    total,
    byRole,
    byKamar,
    latest,
    users: users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      kamar: u.kamar,
      createdAt: u.createdAt,
    })),
  };
};

module.exports = {
  create,
  findId,
  lookup,
  remove,
  update,
  getUserDashboard
};
