const errorHandler = (error, request, response, next) => {
    const status = error.status || 500

    if (error?.original?.code === '23505') {
        return response.status(status).json({
            message: error.message,
            error: true,
            status: 404
        })
    }

    if(error?.errorInfo?.code === 'auth/argument-error'){
        return response.status(status).json({
            message: error.errorInfo.message,
            error: true,
            status: 404
        })
    }

    return response.status(status).json({
        message: error.message,
        error: true,
        status
    })
}

module.exports = errorHandler