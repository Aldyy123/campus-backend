const { createLesson, getAllLessons, getLessonById, updateLesson, deleteLesson} = require('../controllers/lesson');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const router = require('express').Router();


router.route('/').post(authentication, authorization, createLesson).get(authentication, getAllLessons)
router.route('/id/:id').get(authentication, getLessonById).put(authentication, updateLesson).delete(authentication, authorization, deleteLesson)

module.exports = router;