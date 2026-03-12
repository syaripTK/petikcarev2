const { hashPassword } = require("../../shared/utils/helpers");
const { failed, success } = require("../../shared/utils/payload");
const {
  create,
  findId,
  lookup,
  remove,
  update,
} = require("./users.service.js");
const { v4: uuidv4 } = require("uuid");

const createUser = async (req, res) => {
  try {
    const { nama, email, password, role, kamar } = req.body;
    const hashed = await hashPassword(password);
    const body = {
      id: uuidv4(),
      name: nama,
      email,
      password: hashed,
      role,
      kamar,
    };
    await create(body);
    return success(res, 201, "User berhasil ditambahkan");
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

const lookAllUser = async (req, res) => {
  try {
    const data = await lookup();
    return success(res, 200, "Data user", data);
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findId(id);
    if (!user) {
      return failed(res, 404, `User dengan id (${id}) tidak ditemukan`);
    }
    const { nama, email, role, kamar } = req.body;
    let password = user.password;
    if (req.body.password) {
      const hashed = hashPassword(req.body.password);
      password = hashed;
    }
    const body = {
      name: nama,
      email,
      password,
      role,
      kamar,
    };
    await update(id, body);
    return success(res, 200, "Data user berhasil diupdate");
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

const dropUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findId(id);
    console.info(user)
    if (!user) {
      return failed(res, 404, "Data user tidak ditemukan");
    }
    await remove(id);
    return success(res, 200, "User berhasil dihapus");
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

module.exports = { createUser, lookAllUser, editUser, dropUser };
