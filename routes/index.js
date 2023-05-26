const router = require('express').Router();
const schedule = require('./schedule');
const users = require('./users');

router.use('/schedule', schedule);
router.use('/users', users);

module.exports = router;