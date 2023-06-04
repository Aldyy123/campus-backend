const { createLessonSchedule } = require('../controllers/schedule');
const authorization = require('../middlewares/authorization');

const router = require('express').Router();


router.route('/').post(authorization, createLessonSchedule)

module.exports = router;