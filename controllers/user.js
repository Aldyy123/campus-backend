const {
    User
} = require('../models');
const {
    signInWithEmailAndPassword,
    getAuth
} = require('firebase/auth')
const {
    initAdmin
} = require('../config/firebase')

const insertUser = async (req, res, next) => {
    try {
        const {
            email,
            password,
            token
        } = req.body
        if (token === undefined) {
            return res.status(403).json({
                message: 'Sorry token not found'
            })
        }
        const decodedToken = await initAdmin.auth().verifyIdToken(token)
        const user = await User.findOrCreate({
            where: {
                id: decodedToken.id
            },
            defaults: {
                role: 'mahasiswa',
                email,
                password
            }
        })
        res.json({
            user
        })
    } catch (error) {
        return next(error)
    }
}

const signInEmail = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body
        const auth = getAuth()
        const userLogin = await signInWithEmailAndPassword(auth, email, password)
        res.json({
            message: 'Successfully login',
            user: userLogin.user
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    insertUser,
    signInEmail
}