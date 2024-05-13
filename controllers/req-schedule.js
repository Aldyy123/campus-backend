const { checkDataExist } = require('../helpers/helper')
const { ReqSchedule, Schedule, Student } = require('../models')
const moment = require('moment')

const createReqSchedule = async (req, res, next) => {
  try {
    const { schedule_date, reason, nim, description } = req.body
    const { id } = req.params
    const existDataNim = await checkDataExist(Student, 'nim', nim)
    if (!existDataNim) {
      return res.status(404).json({
        message: 'Student not found'
      })
    }

    const existDataSchedule = await checkDataExist(Schedule, 'id', id)
    if (!existDataSchedule) {
      return res.status(404).json({
        message: 'Schedule not found'
      })
    }

    const resultExistRescheduleNim = await checkReschduleWithNim(
      { nim, schedule_id: id },
      res,
      next
    )
    if (resultExistRescheduleNim) return

    if (!schedule_date || !reason || !nim) {
      return res.status(400).json({
        message: 'Bad Request - date, reason, and nim are required'
      })
    }

    if (
      moment(schedule_date).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')
    ) {
      return res.status(400).json({
        message: 'Schedule date must be greater than today'
      })
    }

    const createReqSchedule = await ReqSchedule.create({
      schedule_date,
      reason,
      nim,
      description,
      schedule_id: id
    })
    if (!createReqSchedule) {
      return res.status(400).json({
        message: 'Failed create request schedule'
      })
    }

    return res.status(201).json({
      message: 'Success create request schedule',
      data: createReqSchedule
    })
  } catch (error) {
    return next(error)
  }
}

const checkReschduleWithNim = async ({ nim, schedule_id }, res, next) => {
  try {
    const existRescheduleNim = await ReqSchedule.findOne({
      where: {
        nim,
        schedule_id
      }
    })
    if (existRescheduleNim) {
      res.status(400).json({
        message: 'You have already requested a reschedule'
      })
      return true
    }
    return false
  } catch (error) {
    return next(error)
  }
}

const getReqSchedule = async (req, res, next) => {
  try {
    const { id } = req.params
    const existData = await checkDataExist(Schedule, 'id', id)
    if (!existData) {
      return res.status(404).json({
        message: 'Request schedule not found'
      })
    }

    const getReqSchedule = await ReqSchedule.findAll({
      where: {
        schedule_id: id
      }
    })
    return res.status(200).json({
      message: 'Success get request schedule',
      data: getReqSchedule
    })
  } catch (error) {
    return next(error)
  }
}

const getAllReschedule = async (req, res, next) => {
  try {
    const getAllReschedule = await ReqSchedule.findAll()
    return res.status(200).json({
      message: 'Success get all reschedule',
      data: getAllReschedule
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  createReqSchedule,
  getReqSchedule,
  getAllReschedule
}
