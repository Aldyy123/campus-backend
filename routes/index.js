const router = require('express').Router();
const schedule = require('./schedule');
const lesson = require('./lesson');
const users = require('./user');
const student = require('./student');
const lecturer = require('./lecturer');
const rating = require('./rating');

router.use('/schedules', schedule);
router.use('/users', users);
router.use('/students', student);
router.use('/lessons', lesson);
router.use('/lecturers', lecturer);
router.use('/ratings', rating);
router.use('/', (req, res) => res.send('Welcome to API'));

module.exports = router;