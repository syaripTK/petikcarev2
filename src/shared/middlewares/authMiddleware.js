const jwt = require("jsonwebtoken");
const { failed } = require("../utils/payload");

const verifyToken =
  (roles = []) =>
  (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return failed(res, 401, "Maaf, token tidak ditemukan. Silahkan login!");
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return failed(res, 401, "Format token salah");
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role)) {
        return failed(res, 403, "Maaf, akses ditolak");
      }
      next();
    } catch (error) {
      return failed(res, 401, "Maaf, token tidak valid atau kadaluwarsa");
    }
  };

module.exports = verifyToken;
