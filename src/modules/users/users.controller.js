const { hashPassword } = require("../../shared/utils/helpers");
const { failed, success } = require("../../shared/utils/payload");
const { deleteRefreshTokensByUserId } = require("../auth/auth.service.js");
const { deleteBySantriId } = require("../complaints/complaint.service.js");
const {
  create,
  findId,
  lookup,
  remove,
  update,
  getUserDashboard,
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

const searchUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await findId(id);
    if (!user) {
      return failed(res, 404, `User dengan id (${id}) tidak ditemukan`);
    }
    return success(res, 200, "Data user berhasil diambil", user);
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

    const updateBody = {};
    if (req.body.nama !== undefined) updateBody.name = req.body.nama;
    if (req.body.email !== undefined) updateBody.email = req.body.email;
    if (req.body.role !== undefined) updateBody.role = req.body.role;
    if (req.body.kamar !== undefined) updateBody.kamar = req.body.kamar;
    if (req.body.password !== undefined) {
      updateBody.password = await hashPassword(req.body.password);
    }

    if (Object.keys(updateBody).length === 0) {
      return failed(res, 400, "Tidak ada field untuk diupdate");
    }

    await update(id, updateBody);
    return success(res, 200, "Data user berhasil diupdate");
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

const dropUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findId(id);
    if (!user) {
      return failed(res, 404, "Data user tidak ditemukan");
    }
    await deleteBySantriId(id);
    await deleteRefreshTokensByUserId(id);
    await remove(id);
    return success(res, 200, "User berhasil dihapus");
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

const dashboardUsers = async (req, res) => {
  try {
    const data = await getUserDashboard();
    return success(res, 200, "Admin dashboard user data", data);
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

module.exports = {
  createUser,
  lookAllUser,
  editUser,
  dropUser,
  dashboardUsers,
  searchUserById
};
