const {
    User
} = require('../models');
const {
    signInWithEmailAndPassword,
    signInWithCustomToken,
    getAuth,
    createUserWithEmailAndPassword
} = require('firebase/auth')
const {
    initAdmin
} = require('../config/firebase')

const insertUser = async (req, res, next) => {
    try {
        const {
            email,
        } = req.body
        const user = await User.findOrCreate({
            where: {
                email: req.decodeToken.email
            },
            defaults: {
                role: req.decodeToken.role,
                email,
            }
        })
        res.json({
            user: user[0],
        })
    } catch (error) {
        return next(error)
    }
}

const signInEmail = async (req, res, next) => {
    try {
        const {
            email,
            password,
            role
        } = req.body
        const authAdmin = initAdmin.auth()
        const auth = getAuth()
        const users = await signInWithEmailAndPassword(auth, email, password)
        const token = await authAdmin.createCustomToken(users.user.uid, {
            role
        })
        const userLogin = await signInWithCustomToken(auth, token)
        res.json({
            message: 'Successfully login',
            user: userLogin.user
        })
    } catch (error) {
        return next(error)
    }
}

const findUser = async (email) => {
    try {
        const user = await User.findOne({
            where: {
                email
            }
        })
        return user
    } catch (error) {
        return error
    }
}

const updateUser = async (id, data) => {
    try {
        const user = await User.update({

        })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    insertUser,
    signInEmail,
    findUser
}