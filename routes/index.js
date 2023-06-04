const router = require('express').Router();
const schedule = require('./schedule');
const lesson = require('./lesson');
const users = require('./user');
const student = require('./student');
const lecturer = require('./lecturer');

router.use('/schedules', schedule);
router.use('/users', users);
router.use('/students', student);
router.use('/lessons', lesson);
router.use('/lecturers', lecturer);

module.exports = router;