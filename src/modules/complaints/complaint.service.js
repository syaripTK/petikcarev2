const { Complaints, User } = require("../../db/models/index.js");

const create = async (data) => {
  return await Complaints.create(data);
};

const getAll = async () => {
  return await Complaints.findAll({
    include: [
      {
        model: User,
        as: "santri",
        attributes: ["id", "name"],
      },
    ],
  });
};

const getById = async (id) => {
  return await Complaints.findOne({
    where: { id },
    include: [
      {
        model: User,
        as: "santri",
        attributes: ["id", "name"],
      },
    ],
  });
};

const getBySantriId = async (santriId) => {
  return await Complaints.findAll({
    where: { santri_id: santriId },
    include: [
      {
        model: User,
        as: "santri",
        attributes: ["id", "name"],
      },
    ],
  });
};

const deleteById = async (id) => {
  const complaint = await Complaints.findOne({ where: { id } });
  if (!complaint) {
    throw new Error("Complaint tidak ditemukan");
  }
  await complaint.destroy();
};

const deleteBySantriId = async (santriId) => {
  const complaints = await Complaints.findAll({ where: { santri_id: santriId } });
  for (const complaint of complaints) {
    await complaint.destroy();
  }
}

module.exports = {
  create,
  getAll,
  getById,
  getBySantriId,
  deleteById,
  deleteBySantriId,
};
