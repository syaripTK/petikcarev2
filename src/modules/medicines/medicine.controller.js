const { failed, success } = require("../../shared/utils/payload");
const {
  create,
  look,
  findPreparation,
  update,
  findMedicines,
  drop,
} = require("./medicine.service");
const { v4: uuidv4 } = require("uuid");

const addMedicines = async (req, res) => {
  try {
    const { nama_obat, deskripsi, stok, sediaan } = req.body;
    const prep = await findPreparation(sediaan);
    const body = {
      id: uuidv4(),
      name: nama_obat,
      description: deskripsi,
      stock: stok,
      preparation_id: prep.id,
    };
    console.info(body);
    await create(body);
    return success(res, 201, "Data obat berhasil ditambahkan");
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

const lookAllMedicines = async (req, res) => {
  try {
    const data = await look();
    return success(res, 200, "Data obat", data);
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

const updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await findMedicines(id);
    if (!medicine) return failed(res, 404, "Obat tidak ditemukan");
    const { stok } = req.body;
    const body = {
      stock: stok,
    };
    await update(id, body);
    return success(res, 200, "Data obat berhasil diupdate");
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

const dropMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await findMedicines(id);
    if (!medicine) return failed(res, 404, "Obat tidak ditemukan");
    await drop(id);
    return success(res, 200, "Data obat berhaasil dihapus");
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

module.exports = {
  addMedicines,
  lookAllMedicines,
  updateMedicine,
  dropMedicine,
};
