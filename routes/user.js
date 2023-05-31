const router = require('express').Router();
const {insertUser, signInEmail, findOneUser, deleteUser} = require('../controllers/user');
const authorization = require('../middlewares/authorization');

router.post('/find-or-create', authorization, insertUser)
router.post('/login', signInEmail)
router.route('/id/:id').get(authorization, findOneUser).delete(authorization, deleteUser)

module.exports = router;