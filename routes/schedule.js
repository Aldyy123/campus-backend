const {
  createReqSchedule,
  getReqSchedule,
  getAllReschedule
} = require('../controllers/req-schedule')
const {
  createLessonSchedule,
  getSchedules,
  updateScheduleDosen,
  deleteSchedule,
  absentScheduleForStudent,
  insertManualAbsentFromLecturer
} = require('../controllers/schedule')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

const router = require('express').Router()

router
  .route('/')
  .post(authentication, authorization, createLessonSchedule)
  .get(authentication, getSchedules)
router
  .route('/:id')
  .put(authentication, authorization, updateScheduleDosen)
  .delete(authentication, authorization, deleteSchedule)
router
  .route('/:id/absent/student')
  .post(authentication, absentScheduleForStudent)
router
  .route('/:id/absent/lecturer')
  .post(authentication, authorization, insertManualAbsentFromLecturer)
router
  .route('/req-reschedule/:id')
  .post(authentication, createReqSchedule)
  .get(authentication, authorization, getReqSchedule)
router.route('/req-reschedule/').get(getAllReschedule)

module.exports = router
