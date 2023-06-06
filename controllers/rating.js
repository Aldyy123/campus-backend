const { checkDataExist } = require("../helpers/helper");
const { Rating, Student, Lesson, Lecturer, sequelize } = require("../models");
const insertRating = async (req, res, next) => {
  try {
    const lessonExist = await checkDataExist(
      Lesson,
      "id",
      req.params.lesson_id
    );
    if (!lessonExist) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }
    const studentExist = await checkDataExist(Student, "nim", req.body.nim);
    if (!studentExist) {
      return res.status(404).json({
        message: "Student not found",
      });
    }
    const lecturerExist = await checkDataExist(Lecturer, "nidn", req.body.nidn);
    if (!lecturerExist) {
      return res.status(404).json({
        message: "Lecturer not found",
      });
    }
    const resultExistRating = await checkRatingWithNim(
      { nim: req.body.nim, lesson_id: req.params.lesson_id },
      res,
      next
    );
    if (resultExistRating) return;

    const rating = await Rating.create({
      lesson_id: req.params.lesson_id,
      nidn: req.body.nidn,
      nim: req.body.nim,
      star: req.body.star,
      comment: req.body.comment,
    });
    return res.status(201).json({
      message: "Success insert rating",
      data: rating,
    });
  } catch (error) {
    return next(error);
  }
};

const checkRatingWithNim = async ({ nim, lesson_id }, res, next) => {
  try {
    const existRatingNim = await Rating.findOne({
      where: {
        nim,
        lesson_id,
      },
    });
    if (existRatingNim) {
      res.status(400).json({
        message: "You have already requested a reschedule",
      });
      return true;
    }
    return false;
  } catch (error) {
    return next(error);
  }
};

const existLecturerAndLesson = async ({ nidn, lesson_id }, res, next) => {
  try {
    const existData = await checkDataExist(Lesson, "id", lesson_id);
    if (!existData) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }
    const existLecturer = await checkDataExist(Lecturer, "nidn", nidn);
    if (!existLecturer) {
      return res.status(404).json({
        message: "Lecturer not found",
      });
    }
    if (existData && existLecturer) {
      return true;
    }
    return false;
  } catch (error) {
    return next(error);
  }
};

const getAllRatingLessonWithLecturer = async (req, res, next) => {
  try {
    const { lesson_id, nidn } = req.params;
    const existData = await existLecturerAndLesson(
      { nidn, lesson_id },
      res,
      next
    );
    if (!existData) return;

    const result = await Rating.findOne({
      where: {
        lesson_id,
        nidn,
      },
      attributes: [
        [sequelize.fn("AVG", sequelize.col("star")), "averageStarRating"],
      ],
    });
    const averageStarRating = result.getDataValue("averageStarRating");
    const getAllRating = await Rating.findAll({
      where: {
        lesson_id,
        nidn,
      },
    });
    return res.status(200).json({
      message: "Success get all rating",
      data: {
        average_rating: averageStarRating,
        details: getAllRating,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  insertRating,
  getAllRatingLessonWithLecturer,
};
