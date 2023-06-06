const { insertRating, getAllRatingLessonWithLecturer} = require('../controllers/rating');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const router = require('express').Router();


router.route('/lesson/:lesson_id').post(authentication, insertRating)
router.route('/lesson/:lesson_id/nidn/:nidn').get(authentication, getAllRatingLessonWithLecturer)
// router.route('/id/:id').get(authentication, getLessonById).put(authentication, authorization, updateLesson).delete(authentication, authorization, deleteLesson)

module.exports = router;