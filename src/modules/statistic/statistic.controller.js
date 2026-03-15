const { success, failed } = require("../../shared/utils/payload");
const {
  getSummary,
  getTopMedicines,
  getCommonComplaints,
} = require("./statistic.service.js");

const summary = async (req, res) => {
  try {
    const data = await getSummary();
    return success(res, 200, "Summary statistik", data);
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

const topMedicines = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    const data = await getTopMedicines(limit);
    return success(res, 200, "Top medicines", data);
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

const commonComplaints = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    const data = await getCommonComplaints(limit);
    return success(res, 200, "Common complaints keywords", data);
  } catch (error) {
    return failed(res, 500, error.message);
  }
};

module.exports = { summary, topMedicines, commonComplaints };
