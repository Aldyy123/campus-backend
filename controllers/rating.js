const {Rating} = require('../models');
const insertRating = async (req, res, next) => {
    try {
        const rating = await Rating.create(req.body);
        return res.status(201).json({
            message: 'Success insert rating',
            data: rating
        })
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    insertRating
}