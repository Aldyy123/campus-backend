const { createLessonSchedule, getSchedules, updateScheduleDosen, deleteSchedule } = require('../controllers/schedule');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const router = require('express').Router();


router.route('/').post(authentication, authorization, createLessonSchedule)
router.route('/:id').put(authentication, authorization, updateScheduleDosen).delete(authentication, authorization, deleteSchedule)
router.route('/').get(authentication, getSchedules)

module.exports = router;