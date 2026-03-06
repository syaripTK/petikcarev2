const {
  generateAccessToken,
  generateRefreshToken,
  comparePassword,
} = require("../../shared/utils/helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findByEmail, createRefresh } = require("./auth.service");
const { failed, success } = require("../../shared/utils/payload");
const { v4: uuidv4 } = require("uuid");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findByEmail(email);
    if (!user) {
      return failed(res, 404, "Email tidak terdaftar");
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return failed(res, 401, "Maaf, password salah!");
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    console.info(decoded);
    const body = { id: uuidv4(), user_id: user.id, token: refreshToken };
    await createRefresh(body);
    return success(res, 200, "Login berhasil", {
      tokens: {
        accessToken,
        refreshToken,
      },
      user: {
        id: decoded.id,
        name: decoded.name,
        role: decoded.role,
      },
    });
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

module.exports = { login };
