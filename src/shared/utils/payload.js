const success = (res, code, message, data) => {
  return res.status(code).json({
    success: true,
    message,
    data,
  });
};

const failed = (res, code, message, errors) => {
  return res.status(code).json({
    success: false,
    message,
    errors,
  });
};

module.exports = {
  success,
  failed,
};
