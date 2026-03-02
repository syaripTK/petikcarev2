process.env.TZ = "Asia/Jakarta";
const express = require("express");
const sequelize = require("./config/sequelize.js");
const path = require("path");
// const authRoute = require("./routes/auth.route.js");
// const userRoute = require("./routes/user.route.js");
// const karyawanRoute = require("./routes/karyawan.route.js");
// const cutiRoute = require("./routes/cuti.route.js");
// const approvalRoute = require("./routes/approval.route.js");
// const reportRoute = require("./routes/report.route.js");
const notFound = require("./shared/middlewares/errors/notFound.js");
const errorHandler = require("./shared/middlewares/errors/errorHandler.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/api", express.static(path.join(__dirname, "uploads")));

// app.use("/api/auth", authRoute);
// app.use("/api/masterdata/user", userRoute);
// app.use("/api/masterdata/karyawan", karyawanRoute);
// app.use("/api/cuti", cutiRoute);
// app.use("/api/approval", approvalRoute);
// app.use("/api/report", reportRoute);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
