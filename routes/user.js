const router = require('express').Router();
const {insertUser, signInEmail} = require('../controllers/user');
const authorization = require('../middlewares/authorization');

router.post('/create', authorization, insertUser)
router.post('/login', signInEmail)

module.exports = router;