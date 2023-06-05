const { checkDataExist } = require('../helpers/helper');
const {Rating, Student, Lesson, Lecturer} = require('../models');
const insertRating = async (req, res, next) => {
    try {
        const lessonExist = await checkDataExist(Lesson, 'id', req.params.lesson_id);
        if(!lessonExist){
            return res.status(404).json({
                message: "Lesson not found"
            })
        }
        const studentExist = await checkDataExist(Student, 'nim', req.body.nim);
        if(!studentExist){
            return res.status(404).json({
                message: "Student not found"
            })
        }
        const lecturerExist = await checkDataExist(Lecturer, 'nidn', req.body.nidn);
        if(!lecturerExist){
            return res.status(404).json({
                message: "Lecturer not found"
            })
        }
        const rating = await Rating.create(req.body);
        return res.status(201).json({
            message: 'Success insert rating',
            data: rating
        })
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    insertRating
}