const authentication = (req, res, next) => {
    const {Authorization} = req.header
    if (user) {
        return next()
    }
    return res.status(403).json({
        message: 'You are not authenticated'
    })
}