const router = require("express").Router();
const districtCtrl = require("../controllers/districtCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/districtData")
  .get(auth,authAdmin,districtCtrl.getallData)
  .post(auth, authAdmin, districtCtrl.postdata);
  // .get(districtCtrl.getallData)

module.exports = router;
