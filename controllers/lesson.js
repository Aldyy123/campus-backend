const { Lesson } = require("../models");
const createLesson = async (req, res, next) => {
  try {
    const lessons = await Lesson.create(req.body);
    return res.status(201).json({
        message: "Success create lesson",
        data: lessons
    })
  } catch (error) {
    return next(error);
  }
};

module.exports = {
    createLesson,
}