const { Lesson, Schedule, Absent, Sequelize } = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");
const { checkDataExist } = require("../helpers/helper");

const createLessonSchedule = async (req, res, next) => {
  try {
    const { name, schedule_date, room, sks, nidn } = req.body;
    if(moment(schedule_date).format("YYYY-MM-DD") < moment().format("YYYY-MM-DD")) {
      return res.status(400).json({
        message: "Schedule date must be greater than today"
      })
    }
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
            [Op.lte]: moment(date).add(1, "days").format("YYYY-MM-DD"),
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

const updateScheduleDosen = async (req, res, next) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findOne({
      where: {
        id,
      },
    });
    if (!schedule) {
      return res.status(404).json({
        message: "Schedule not found",
      });
    }

    const { name } = req.body;
    let lessons;
    if (name) {
      lessons = await Lesson.findOne({
        where: {
          name,
        },
      });

      if (!lessons) {
        return res.status(404).json({
          message: "Sorry, Lesson not found. Please create lesson first",
        });
      }
    }

    const updateSchedule = await Schedule.update(
      {
        ...schedule,
        ...req.body,
      },
      {
        where: {
          id,
        },
      }
    );
    if(!updateSchedule) {
      return res.status(400).json({
        message: "Failed update schedule"
      })
    }
    return res.status(200).json({
      message: "Success update schedule",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteSchedule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findOne({
      where: {
        id,
      }
    })
    if(!schedule) {
      return res.status(404).json({
        message: "Schedule not found"
      })
    }

    const deleteSchedule = await Schedule.destroy({
      where: {
        id
      }
    })
    if(!deleteSchedule) {
      return res.status(400).json({
        message: "Failed delete schedule"
      })
    }
    return res.status(200).json({
      message: "Success delete schedule"
    })
  } catch (error) {
    return next(error);
  }
}

/**
 * Create Absent student
 * @param {integer} nim
 * @param {uuid} schedule_id
 * @param {string} reason
 * @param {string} status
 * @returns {object} absent
 */
const absentScheduleForStudent = async (req, res, next) => {
  try {
    const { nim, schedule_id, reason, face_id } = req.body;
    const schedule = await checkDataExist(Schedule, "id", schedule_id);
    if (!schedule) {
      return res.status(404).json({
        message: "Schedule not found",
      });
    }

    const studentExist = await checkDataExist(Student, "face_id", face_id);
    if (!studentExist) {
      return res.status(404).json({
        message: "Sorry face id not match with our database",
      });
    }

    const absent = await Absent.create({
      nim,
      schedule_id,
      reason,
      status: 'present',
    })

    return res.status(201).json({
      message: "Success absent schedule",
      data: absent
    })
  } catch (error) {
    return next(error);
  }
}

const insertManualAbsentFromLecturer = async (req, res, next) => {
  try {
    const { nim, schedule_id, reason, status } = req.body;
    const schedule = await checkDataExist(Schedule, "id", schedule_id);
    if (!schedule) {
      return res.status(404).json({
        message: "Schedule not found",
      });
    }

    const student = await checkDataExist(Student, "nim", nim);
    if (!student) {
      return res.status(404).json({
        message: "Schedule not found",
      });
    }

    const absent = await Absent.create({
      nim,
      schedule_id,
      reason,
      status,
    })

    return res.status(201).json({
      message: "Success absent schedule",
      data: absent
    })
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createLessonSchedule,
  getSchedules,
  updateScheduleDosen,
  deleteSchedule,
  absentScheduleForStudent,
  insertManualAbsentFromLecturer
};
