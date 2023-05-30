const router = require('express').Router();
const schedule = require('./schedule');
const users = require('./user');
const student = require('./student');

router.use('/schedule', schedule);
router.use('/users', users);
router.use('/students', student);

module.exports = router;