const {
    insertBiodataStudent,
    findOneStudent,
    deleteOneStudent
} = require('../controllers/student');
const {
    deleteUser
} = require('../controllers/user');
const authorization = require('../middlewares/authorization');
const router = require('express').Router();

router.route('/').post(authorization, insertBiodataStudent)
router.route('/id/:id').get(authorization, findOneStudent).delete(authorization, deleteUser).put(authorization, findOneStudent)

module.exports = router;