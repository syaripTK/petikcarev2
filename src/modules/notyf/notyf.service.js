const { Notifications } = require("../../db/models/index.js");

const getByUserId = async (userId) => {
  return await Notifications.findAll({
    where: { user_id: userId },
    order: [["createdAt", "DESC"]],
  });
};

const findById = async (id) => {
  return await Notifications.findByPk(id);
};

const markAsRead = async (id) => {
  const notif = await Notifications.findByPk(id);
  if (!notif) return null;
  await notif.update({ is_read: true });
  return notif;
};

module.exports = { getByUserId, findById, markAsRead };
