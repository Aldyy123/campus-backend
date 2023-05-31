const {
    Student,
    User
} = require('../models');
const {
    findOneUser
} = require('./user');

const insertBiodataStudent = async (req, res, next) => {
    try {
        const decodeToken = req.decodeToken
        const user = await findOneUser(decodeToken.email)
        const student = await Student.create({
            ...req.body,
            email: user.email,
            id: user.id
        })
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

const updateOneStudent = async (req, res, next) => {
    try {
        await Student.update({
            ...req.body
        }, {
            where: {
                id: req.params.id
            }
        })
        await User.update({
            email: req.body.email,
        }, {
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json({
            message: "Success update student",
        })
    } catch (error) {
        return next(error)
    }
}

const deleteOneStudent = async (req, res, next) => {
    try {
        const student = await Student.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json({
            message: "Success delete student",
            data: student
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    insertBiodataStudent,
    findOneStudent,
    updateOneStudent,
    deleteOneStudent
}