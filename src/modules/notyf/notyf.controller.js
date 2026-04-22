const { failed, success } = require("../../shared/utils/payload");
const { getByUserId, findById, markAsRead } = require("./notyf.service");

const getMyNotifications = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    const data = await getByUserId(userId);
    return success(res, 200, "Daftar notifikasi", data);
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user && req.user.id;
    const notif = await findById(id);
    if (!notif) return failed(res, 404, "Notifikasi tidak ditemukan");
    if (notif.user_id !== userId) return failed(res, 403, "Akses ditolak");
    const updated = await markAsRead(id);
    return success(res, 200, "Notifikasi ditandai telah dibaca", updated);
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

module.exports = { getMyNotifications, markNotificationRead };
