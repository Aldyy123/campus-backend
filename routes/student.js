const {
    insertBiodataStudent,
    findOneStudent,
    updateOneStudent
} = require('../controllers/student');
const {
    deleteUser
} = require('../controllers/user');
const authorization = require('../middlewares/authorization');
const router = require('express').Router();

router.route('/').post(authorization, insertBiodataStudent)
router.route('/id/:id').get(authorization, findOneStudent).put(authorization, updateOneStudent)

module.exports = router;