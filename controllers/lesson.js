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

const getAllLessons = async (req, res, next) => {
  try {
    const lessons = await Lesson.findAll();
    return res.status(200).json({
      message: "Success get all lessons",
      data: lessons,
    })
  } catch (error) {
    return next(error);
  }
}

const getLessonById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findOne({
      where: {
        id,
      },
    });
    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }
    return res.status(200).json({
      message: "Success get lesson",
      data: lesson,
    });
  } catch (error) {
    return next(error);
  }
}

const updateLesson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findOne({
      where: {
        id,
      },
    });
    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }
    const updateLesson = await Lesson.update(
      {
        ...lesson,
        ...req.body,
      },
      {
        where: {
          id,
        },
      }
    );
    if(!updateLesson) {
      return res.status(400).json({
        message: "Failed update lesson",
      });
    }
    return res.status(200).json({
      message: "Success update lesson",
    });
  } catch (error) {
    return next(error);
  }
}

const deleteLesson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findOne({
      where: {
        id
      }      
    })
    if(!lesson) {
      return res.status(404).json({
        message: "Lesson not found"
      })
    }
    const deleteLesson = await Lesson.destroy({
      where: {
        id
      }
    })
    if(!deleteLesson) {
      return res.status(400).json({
        message: "Failed delete lesson"
      })
    }

    return res.status(200).json({
      message: "Success delete lesson"
    })
  } catch (error) {
    return next(error);
  }
}

module.exports = {
    createLesson,
    getAllLessons,
    getLessonById,
    updateLesson,
    deleteLesson
}