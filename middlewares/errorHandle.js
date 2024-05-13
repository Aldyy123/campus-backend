const errorHandler = (error, request, response, next) => {
  const status = error.status || 500

  if (error?.original?.code === '23505') {
    return response.status(status).json({
      message: error.original.message,
      error: true,
      status
    })
  }

  if (error?.errorInfo?.code === 'auth/argument-error') {
    return response.status(status).json({
      message: error.errorInfo.message,
      error: true,
      status
    })
  }

  return response.status(status).json({
    message: error.message,
    error: true,
    status
  })
}

module.exports = errorHandler
