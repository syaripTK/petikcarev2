const { User, Refresh_token } = require("../../db/models/index.js");

const createUser = async (body) => {
  return await User.create(body);
};

const createRefresh = async (body) => {
  return await Refresh_token.create(body);
};

const findId = async (id) => {
  return await User.findByPk(id);
};

const findByRole = async (role) => {
  return await User.findAll({
    where: { role },
  });
};

const findByEmail = async (email) => {
  return await User.findOne({
    where: { email },
  });
};

const findByToken = async (token) => {
  return await Refresh_token.findOne({
    where: { token },
  });
};

const remove = async (id) => {
  return await User.destroy({
    where: { id },
  });
};

const removeTokenByUser = async (user_id) => {
  return await Refresh_token.destroy({
    where: { user_id },
  });
};

module.exports = {
  createUser,
  createRefresh,
  findId,
  findByRole,
  remove,
  removeTokenByUser,
  findByEmail,
  findByToken,
};
