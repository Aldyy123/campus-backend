const { checkUserExist } = require("../controllers/user");
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
    const user = await User.findOne({
      where: {
        email: decodedToken.email,
      },
    });
    const userExist = await checkUserExist("email", decodedToken.email);
    if (decodedToken.email === user.email && userExist) {
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
