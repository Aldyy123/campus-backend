const router = require('express').Router();

const {
    insertBiodataLecturer,
    findOneLecturer,
    updateOneLecturer,
    deleteOneLecturer
} = require('../controllers/lecturer');
const authorization = require('../middlewares/authorization');

router.route('/').post(authorization, insertBiodataLecturer)
router.route('/id/:id').get(authorization, findOneLecturer).put(authorization, updateOneLecturer).delete(authorization, deleteOneLecturer)
// router.route('/id/:id/schedules').get(authorization, findOneLecturer).put(authorization, updateOneLecturer).delete(authorization, deleteOneLecturer)

module.exports = router;