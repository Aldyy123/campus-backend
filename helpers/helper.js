const checkDataExist = async (model, field, value) => {
  try {
    const result = await model.findOne({
      where: {
        [field]: value
      }
    })
    if (result) {
      return true
    }
    return false
  } catch (error) {
    return error
  }
}

module.exports = {
  checkDataExist
}
