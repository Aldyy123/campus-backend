const { createLessonSchedule, getSchedules } = require('../controllers/schedule');
const authentication = require('../middlewares/authentication');

const router = require('express').Router();


router.route('/').post(authentication, createLessonSchedule)
router.route('/').get(authentication, getSchedules)

module.exports = router;