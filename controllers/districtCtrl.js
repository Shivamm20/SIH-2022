const DISTRICT_MODEL = require("../models/DistrictData");

const districtCtrl = {
  getallData: async (req, res) => {
    try {
      const districtData = await DISTRICT_MODEL.find();
      res.json({ success: true, districtData });
    } catch (err) {
      res.status(400).json({ success: false, err: err.message });
    }
  },
  postdata: async (req, res) => {
    try {
      const { id, name, state, students_total, student_out, pincode } = req.body;
      const data=DISTRICT_MODEL({id, name, state, students_total, student_out, pincode});
      await data.save();
      res.json({ success: true, data,msg:"Data Posted"});
    } catch (err) {
      res.status(400).json({ success: false, err: err.message });
    }
  },
};

module.exports = districtCtrl;
