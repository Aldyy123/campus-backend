const { Lesson, Schedule, Lecturer, Sequelize } = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");

const createLessonSchedule = async (req, res, next) => {
  try {
    const { name, schedule_date, room, sks, nidn } = req.body;
    const lesson = await Lesson.findOne({
      where: {
        name,
      },
    });
    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }
    const schedule = await Schedule.create({
      nidn,
      name,
      schedule: schedule_date,
      room: room.trim(),
      sks,
      lesson_id: lesson.id,
    });
    return res.status(201).json({
      message: "Success create lesson schedule",
      data: schedule,
    });
  } catch (error) {
    return next(error);
  }
};

const getSchedules = async (req, res, next) => {
  try {
    const { date } = req.query;
    let schedules;
    if (date) {
      schedules = await Schedule.findAll({
        where: {
          schedule: {
            [Op.gte]: date,
            [Op.lte]: moment(date).add(1, 'days').format('YYYY-MM-DD'),
          },
        },
      });
    } else {
      schedules = await Schedule.findAll({
        where: {
          schedule: {
            [Op.gte]: Sequelize.literal("CURRENT_DATE"),
          },
        },
      });
    }
    if (!schedules) {
      return res.status(404).json({
        message: "Schedules not found",
      });
    }
    return res.status(200).json({
      message: "Success get schedules",
      data: schedules,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createLessonSchedule,
  getSchedules,
};
