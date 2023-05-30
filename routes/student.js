const { insertBiodataStudent, findOneStudent } = require('../controllers/student');
const authorization = require('../middlewares/authorization');
const router = require('express').Router();

router.route('/').post(authorization, insertBiodataStudent)
router.route('/id/:id').get(authorization, findOneStudent)

module.exports = router;