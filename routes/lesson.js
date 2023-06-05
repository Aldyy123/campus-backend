const { createLesson, getAllLessons, getLessonById, updateLesson} = require('../controllers/lesson');
const authentication = require('../middlewares/authentication');
const router = require('express').Router();


router.route('/').post(authentication, createLesson).get(authentication, getAllLessons)
router.route('/id/:id').get(authentication, getLessonById).put(authentication, updateLesson)

module.exports = router;