const { Student } = require('../models');
const { findUser } = require('./user');

const insertBiodataStudent = async (req, res, next) => {
    try {
        const decodeToken = req.decodeToken
        const user = await findUser(decodeToken.email)
        const student = await Student.create({
            ...req.body,
            email: user.email,
            id: user.id
        })
        console.log(student);
        return res.status(201).json({
            message: "Success create student",
            data: student
        })
    } catch (error) {
        return next(error)
    }
}

const findOneStudent = async (req, res, next) => {
    try {
        const student = await Student.findOne({
            where: {
                id: req.params.id
            },
            include: 'user'
        })
        return res.status(200).json({
            message: "Success get student",
            data: student
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    insertBiodataStudent,
    findOneStudent
}