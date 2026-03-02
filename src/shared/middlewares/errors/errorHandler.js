const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  return res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal server error",
  });
};

module.exports = errorHandler;
