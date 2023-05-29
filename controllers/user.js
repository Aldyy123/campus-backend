const {User} = require('../models');
const {signInWithEmailAndPassword, getAuth} = require('firebase/auth')
const insertUser = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const user = await User.create({
            role: 'mahasiswa',
            email, password
        })
        res.json({
            user
        })
    } catch (error) {
        return next(error)
    }
}

const signInEmail  = async (req, res, next) => {
    try {
        const {email, password} = req.body
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