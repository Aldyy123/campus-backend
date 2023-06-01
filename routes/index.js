const router = require('express').Router();
const schedule = require('./schedule');
const users = require('./user');
const student = require('./student');
const lecturer = require('./lecturer');

router.use('/schedule', schedule);
router.use('/users', users);
router.use('/students', student);
router.use('/lecturers', lecturer);

module.exports = router;