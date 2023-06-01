const { initAdmin } = require('../config/firebase');
const {
    Student,
    User
} = require('../models');
const {
    findOneUser, checkUserExist
} = require('./user');

const insertBiodataStudent = async (req, res, next) => {
    try {
        const decodeToken = req.decodeToken
        const user = await findOneUser(decodeToken.email, 'student')
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        if(decodeToken.role === `dosen`){
            return res.status(403).json({
                message: "Forbidden"
            })
        }
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
        if(!student){
            return res.status(404).json({
                message: "Student not found"
            })
        }
        return res.status(200).json({
            message: "Success get student",
            data: student
        })
    } catch (error) {
        return next(error)
    }
}

const checkStudentExist = async (field, value) => {
    try {
        const student = await Student.findOne({
            where: {
                [field]: value
            }
        })
        if(student){
            return true
        }
        return false
    } catch (error) {
        return error
    }
}

const updateOneStudent = async (req, res, next) => {
    const authAdmin = initAdmin.auth()
    try {
        const studentExist = await checkStudentExist('id', req.params.id)
        if(!studentExist){
            return res.status(404).json({
                message: "Student not found"
            })
        }
        await Student.update({
            ...req.body
        }, {
            where: {
                id: req.params.id
            }
        })
        if(req.body?.email){
            await User.update({
                email: req.body.email,
            }, {
                where: {
                    id: req.params.id
                }
            })
            await authAdmin.updateUser(req.decodeToken.uid, {
                email: req.body.email
            })
        }
        return res.status(200).json({
            message: "Success update student",
        })
    } catch (error) {
        return next(error)
    }
}

const deleteOneStudent = async (req, res, next) => {
    try {
        const studentExist = await checkStudentExist('id', req.params.id)
        if(!studentExist){
            return res.status(404).json({
                message: "Student not found"
            })
        }
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
    deleteOneStudent,
    checkStudentExist
}