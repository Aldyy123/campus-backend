const router = require('express').Router();
const {insertUser, signInEmail, findOneUser} = require('../controllers/user');
const authorization = require('../middlewares/authorization');

router.post('/find-or-create', authorization, insertUser)
router.post('/login', signInEmail)
router.get('/id/:id', authorization, findOneUser)

module.exports = router;