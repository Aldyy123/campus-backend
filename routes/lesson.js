const { createLesson} = require('../controllers/lesson');
const authorization = require('../middlewares/authorization');
const router = require('express').Router();


router.route('/').post(authorization, createLesson)

module.exports = router;