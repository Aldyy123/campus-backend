const { createLessonSchedule, getSchedules } = require('../controllers/schedule');
const authorization = require('../middlewares/authorization');

const router = require('express').Router();


router.route('/').post(authorization, createLessonSchedule)
router.route('/').get(authorization, getSchedules)

module.exports = router;