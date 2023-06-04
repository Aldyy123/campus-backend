const router = require("express").Router();

const {
  insertBiodataLecturer,
  findOneLecturer,
  updateOneLecturer,
  deleteOneLecturer,
} = require("../controllers/lecturer");
const authorization = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");

router.route("/").post(authentication, authorization, insertBiodataLecturer);
router
  .route("/id/:id")
  .get(authentication, authorization, findOneLecturer)
  .put(authentication, authorization, updateOneLecturer)
  .delete(authentication, authorization, deleteOneLecturer);
// router.route('/id/:id/schedules').get(authorization, findOneLecturer).put(authorization, updateOneLecturer).delete(authorization, deleteOneLecturer)

module.exports = router;
