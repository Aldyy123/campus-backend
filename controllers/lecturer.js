const { Lecturer, User } = require('../models')
const { findOneUser } = require('./user')
const { initAdmin } = require('../config/firebase')

const insertBiodataLecturer = async (req, res, next) => {
  try {
    const decodeToken = req.decodeToken
    const user = await findOneUser(decodeToken.email, 'lecturer')
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }
    if (decodeToken.role === 'mahasiswa') {
      return res.status(403).json({
        message: 'Forbidden'
      })
    }

    const lecutrer = await Lecturer.create({
      ...req.body,
      email: user.email,
      id: user.id
    })
    return res.status(201).json({
      message: 'Success create lecturer',
      data: lecutrer
    })
  } catch (error) {
    return next(error)
  }
}

const checkLecturerExist = async (field, value) => {
  try {
    const lecturer = await Lecturer.findOne({
      where: {
        [field]: value
      }
    })
    if (lecturer) {
      return true
    }
    return false
  } catch (error) {
    return error
  }
}

const findOneLecturer = async (req, res, next) => {
  try {
    const lecturer = await Lecturer.findOne({
      where: {
        id: req.params.id
      },
      include: 'user'
    })
    if (!lecturer) {
      return res.status(404).json({
        message: 'lecturer not found'
      })
    }
    return res.status(200).json({
      message: 'Success get lecturer',
      data: lecturer
    })
  } catch (error) {
    return next(error)
  }
}

const updateOneLecturer = async (req, res, next) => {
  try {
    const authAdmin = initAdmin.auth()
    const lecturerExist = await checkLecturerExist('id', req.params.id)
    if (!lecturerExist) {
      return res.status(404).json({
        message: 'Lecturer not found'
      })
    }
    await Lecturer.update(
      {
        ...req.body
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    if (req.body?.email) {
      await User.update(
        {
          email: req.body.email
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      await authAdmin.updateUser(req.decodeToken.uid, {
        email: req.body.email
      })
    }
    return res.status(200).json({
      message: 'Success update Lecturer'
    })
  } catch (error) {
    return next(error)
  }
}

const deleteOneLecturer = async (req, res, next) => {
  try {
    const lecturerExist = await checkLecturerExist('id', req.params.id)
    if (!lecturerExist) {
      return res.status(404).json({
        message: 'Lecturer not found'
      })
    }
    const lecturer = await Lecturer.destroy({
      where: {
        id: req.params.id
      }
    })
    return res.status(200).json({
      message: 'Success delete lecturer',
      data: lecturer
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  insertBiodataLecturer,
  findOneLecturer,
  checkLecturerExist,
  updateOneLecturer,
  deleteOneLecturer
}
