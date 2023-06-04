const { createLesson} = require('../controllers/lesson');
const authentication = require('../middlewares/authentication');
const router = require('express').Router();


router.route('/').post(authentication, createLesson)

module.exports = router;