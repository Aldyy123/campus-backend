const router = require('express').Router();
const {insertUser, signInEmail, findOneUser, deleteUser, sendEmailForgotPassword, signUpEmail} = require('../controllers/user');
const authorization = require('../middlewares/authorization');

router.post('/find-or-create', authorization, insertUser)
router.post('/login', signInEmail)
router.post('/register', signUpEmail)
router.route('/id/:id').get(authorization, findOneUser).delete(authorization, deleteUser)
router.post('/email/forgot-password', sendEmailForgotPassword)

module.exports = router;