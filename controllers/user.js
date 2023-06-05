const { User } = require("../models");
const {
  signInWithEmailAndPassword,
  signInWithCustomToken,
  getAuth,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} = require("firebase/auth");
const { initAdmin } = require("../config/firebase");

const insertUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization === undefined) {
      return res.status(403).json({
        message: "Sorry token not found",
      });
    }

    const token = authorization.split(" ")[1];
    const decodedToken = await initAdmin.auth().verifyIdToken(token);
    const user = await User.findOrCreate({
      where: {
        email: decodedToken.email,
      },
      defaults: {
        role: decodedToken.role,
        email: decodedToken.email,
      },
    });
    res.json({
      user: user[0],
    });
  } catch (error) {
    return next(error);
  }
};

const signInEmail = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const authAdmin = initAdmin.auth();
    const auth = getAuth();
    const users = await signInWithEmailAndPassword(auth, email, password);
    const token = await authAdmin.createCustomToken(users.user.uid, {
      role,
    });
    const userLogin = await signInWithCustomToken(auth, token);
    res.json({
      message: "Successfully login",
      user: userLogin.user,
    });
  } catch (error) {
    return next(error);
  }
};

const signUpEmail = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (!role) {
      return res.status(400).json({
        message: "Role is required",
      });
    }
    const authAdmin = initAdmin.auth();
    const auth = getAuth();
    const users = await createUserWithEmailAndPassword(auth, email, password);
    const token = await authAdmin.createCustomToken(users.user.uid, {
      role,
    });
    const userLogin = await signInWithCustomToken(auth, token);
    res.json({
      message: "Successfully register",
      user: userLogin.user,
    });
  } catch (error) {
    return next(error);
  }
};

const findOneUser = async (email, relational) => {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
      include: relational,
    });
    return user;
  } catch (error) {
    return error;
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const authAdmin = await initAdmin.auth();
    const userExist = await checkUserExist("id", req.params.id);
    if (!userExist) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    await authAdmin.deleteUser(req.decodeToken.uid);
    return res.status(200).json({
      message: "Success delete user",
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (id, data) => {
  try {
    const user = await User.update({});
  } catch (error) {
    return next(error);
  }
};

const checkUserExist = async (field, value) => {
  try {
    const user = await User.findOne({
      where: {
        [field]: value,
      },
    });
    if (user) {
      return true;
    }
    return false;
  } catch (error) {
    return next(error);
  }
};

const sendEmailForgotPassword = async (req, res, next) => {
  try {
    const auth = await getAuth();
    const userExist = await checkUserExist("email", req.body.email);
    if (!userExist) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const emailSend = await sendPasswordResetEmail(auth, req.body.email);
    console.log(emailSend);
    return res.status(200).json({
      message: "Success send email forgot password",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  insertUser,
  signInEmail,
  findOneUser,
  deleteUser,
  checkUserExist,
  sendEmailForgotPassword,
  signUpEmail,
};
