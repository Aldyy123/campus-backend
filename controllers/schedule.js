const { Lesson, Schedule } = require("../models");

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
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createLessonSchedule,
  getSchedules,
};
