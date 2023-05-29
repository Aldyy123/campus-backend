const {initAdmin} = require('../config/firebase')

const authorization = async (req, res, next) => {
   try {
    const {authorization} = req.headers
    if(authorization === undefined) {
        return res.status(403).json({
            message: 'Sorry token not found'
        })
    }

    const token = authorization.split(' ')[1]
    const decodedToken = await initAdmin.auth().verifyIdToken(token)
    if(decodedToken.role === 'dosen') {

    }
    console.log(decodedToken);
    return res.status(403).json({
        message: 'You are not authorized'
    })
   } catch (error) {
    return next(error)
   }
}

module.exports = authorization