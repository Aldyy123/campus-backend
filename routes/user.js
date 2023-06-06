const router = require('express').Router();
const {insertUser, signInEmail, findOneUser, deleteUser, sendEmailForgotPassword, signUpEmail, authMe} = require('../controllers/user');
const authentication = require('../middlewares/authentication');

router.post('/find-or-create', insertUser)
router.post('/login', signInEmail)
router.post('/register', signUpEmail)
router.route('/id/:id').get(authentication, findOneUser).delete(authentication, deleteUser)
router.post('/email/forgot-password', sendEmailForgotPassword)
router.route('/me').get(authentication, authMe)

module.exports = router;