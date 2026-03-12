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

module.exports = {
  create,
  findId,
  lookup,
  remove,
  update,
};
