process.env.TZ = "Asia/Jakarta";
const express = require("express");
const sequelize = require("./config/sequelize.js");
const path = require("path");
const medicineRoute = require("./routes/medicines.route.js");
const authRoute = require("./routes/auth.route.js");

const notFound = require("./shared/middlewares/errors/notFound.js");
const errorHandler = require("./shared/middlewares/errors/errorHandler.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoute);
app.use("/api/medicine", medicineRoute);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
