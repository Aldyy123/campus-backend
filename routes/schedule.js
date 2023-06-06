const { createReqSchedule, getReqSchedule } = require('../controllers/req-schedule');
const { createLessonSchedule, getSchedules, updateScheduleDosen, deleteSchedule } = require('../controllers/schedule');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const router = require('express').Router();


router.route('/').post(authentication, authorization, createLessonSchedule)
router.route('/:id').put(authentication, authorization, updateScheduleDosen).delete(authentication, authorization, deleteSchedule)
router.route('/').get(authentication, getSchedules)
router.route('/req-reschedule/:id').post(authentication, createReqSchedule).get(authentication, authorization, getReqSchedule)

module.exports = router;