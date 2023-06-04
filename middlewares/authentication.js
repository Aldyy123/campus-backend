const { checkUserExist } = require("../controllers/user");
const { initAdmin } = require("../config/firebase");
const { User } = require("../models");
const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization === undefined) {
      return res.status(403).json({
        message: "Sorry token not found",
      });
    }

    const token = authorization.split(" ")[1];
    const decodedToken = await initAdmin.auth().verifyIdToken(token);
    const userExist = await checkUserExist("email", decodedToken.email);
    if (decodedToken.uid && userExist) {
      req.decodeToken = decodedToken;
      return next();
    } else {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = authentication;