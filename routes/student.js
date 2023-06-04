const {
    insertBiodataStudent,
    findOneStudent,
    updateOneStudent
} = require('../controllers/student');
const {
    deleteUser
} = require('../controllers/user');
const authentication = require('../middlewares/authentication');
const router = require('express').Router();

router.route('/').post(authentication, insertBiodataStudent)
router.route('/id/:id').get(authentication, findOneStudent).put(authentication, updateOneStudent)

module.exports = router;