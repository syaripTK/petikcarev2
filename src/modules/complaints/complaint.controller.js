const { success, failed } = require("../../shared/utils/payload.js");
const {
  create,
  getAll,
  getById,
  getBySantriId,
  deleteById,
  handleComplaintResponse,
} = require("./complaint.service.js");
const { v4: uuidv4 } = require("uuid");

const createComplaint = async (req, res) => {
  try {
    const { keluhan, keterangan } = req.body;
    const data = {
      id: uuidv4(),
      santri_id: req.user.id,
      title: keluhan,
      description: keterangan,
    };
    const complaint = await create(data);
    return success(res, 201, "Complaint berhasil dibuat", complaint);
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await getAll();
    return success(res, 200, "Daftar complaint berhasil diambil", complaints);
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await getById(id);
    if (!complaint) {
      return failed(res, 404, "Complaint tidak ditemukan");
    }
    return success(res, 200, "Detail complaint berhasil diambil", complaint);
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

const getMyComplaints = async (req, res) => {
  try {
    const complaints = await getBySantriId(req.user.id);
    return success(res, 200, "Daftar complaint berhasil diambil", complaints);
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteById(id);
    return success(res, 200, "Complaint berhasil dihapus");
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

const responseToComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, catatan, medicines } = req.body;
    const complaint = await handleComplaintResponse(id, req.user.id, {
      status,
      catatan,
      medicines,
    });
    return success(res, 200, "Response to complaint successful", complaint);
  } catch (error) {
    return failed(res, 500, error.message);
  }
};
module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  getMyComplaints,
  deleteComplaint,
  responseToComplaint,
};
