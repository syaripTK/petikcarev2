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

const remove = async (id) => {
  return await User.destroy({
    where: { id },
  });
};

const removeToken = async (token) => {
  return await Refresh_token.destroy({
    where: { token },
  });
};

const removeTokenByUser = async (userId) => {
  return await Refresh_token.destroy({
    where: { userId },
  });
};

module.exports = {
  createUser,
  createRefresh,
  findId,
  findByRole,
  remove,
  removeToken,
  removeTokenByUser,
  findByEmail,
};
