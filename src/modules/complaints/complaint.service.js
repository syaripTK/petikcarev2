const {
  Complaints,
  User,
  Medicine_trasactions,
  Medicine,
  Notifications,
  sequelize,
} = require("../../db/models/index.js");
const { v4: uuidv4 } = require("uuid");

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
  const complaints = await Complaints.findAll({
    where: { santri_id: santriId },
  });
  for (const complaint of complaints) {
    await complaint.destroy();
  }
};

const handleComplaintResponse = async (complaintId, handlerId, data) => {
  return await sequelize.transaction(async (t) => {
    const complaint = await Complaints.findByPk(complaintId, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!complaint) {
      throw new Error("Complaint tidak ditemukan");
    }
    if (complaint.status !== "PENDING") {
      throw new Error("Complaint sudah ditangani");
    }

    await complaint.update(
      {
        status: data.status,
        handled_by: handlerId,
        handled_note: data.catatan,
        handled_at: new Date(),
      },
      { transaction: t },
    );

    const medicines_given = [];
    if (data.medicines && data.medicines.length > 0) {
      for (const item of data.medicines) {
        const medicine = await Medicine.findByPk(item.medicine_id, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        if (!medicine) {
          throw new Error(`Obat dengan id ${item.medicine_id} tidak ditemukan`);
        }
        if (medicine.stock < item.quantity) {
          throw new Error(
            `Stok obat ${medicine.name || item.medicine_id} tidak mencukupi`,
          );
        }

        await Medicine.decrement("stock", {
          by: item.quantity,
          where: { id: item.medicine_id },
          transaction: t,
        });
        await Medicine_trasactions.create(
          {
            id: uuidv4(),
            medicine_id: item.medicine_id,
            complaint_id: complaint.id,
            quantity: item.quantity,
            given_by: handlerId,
          },
          { transaction: t },
        );

        medicines_given.push({
          name: medicine.name || item.medicine_id,
          quantity: item.quantity,
        });
      }
    }

    const pengasuhan = await User.findByPk(handlerId, { transaction: t });

    await Notifications.create(
      {
        id: uuidv4(),
        user_id: complaint.santri_id,
        title: "Update Keluhan",
        message: `Keluhan anda telah ditangani oleh ${pengasuhan ? pengasuhan.name : "pengasuh"} dengan status ${data.status}`,
      },
      { transaction: t },
    );

    return {
      complaint_id: complaint.id,
      status: complaint.status,
      handled_at: complaint.handled_at
        ? complaint.handled_at.toISOString()
        : new Date().toISOString(),
      treatment: {
        note: complaint.handled_note || data.catatan || null,
        medicines_given,
      },
    };
  });
};

module.exports = {
  create,
  getAll,
  getById,
  getBySantriId,
  deleteById,
  deleteBySantriId,
  handleComplaintResponse,
};
