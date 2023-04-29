const express = require('express');
const router = express.Router();

// CONTROLLERS
const controller = require('../controllers/usersController');

const uploadAvatar = require("../middleware/uploadAvatar");

const loginValidator = require("../validations/loginValidation");

const registerValidator = require("../validations/registerValidation");

const userInSessionCheck = require("../middleware/userInSessionCheck");

const updateUserValidator = require("../validations/updateUserValidator");

const sessionUserCheck = require("../middleware/sessionUserCheck");


/* GET - Login Form */
router.get('/login', sessionUserCheck, controller.login);

/* POST - PROCESS LOGIN*/
router.post("/login", loginValidator ,controller.processLogin);

/* GET - Register form */
router.get('/register', sessionUserCheck,controller.register);

/* POST - Register user data */
router.post("/", uploadAvatar.single("avatar") ,registerValidator, controller.crear)

router.get("/logout", controller.logout);

/* profile */
router.get("/profile", userInSessionCheck  ,controller.profile);

/*  User edit form */
router.get("/profile/edit",userInSessionCheck  ,controller.editProfile);

/*  Profile update */
router.put("/profile/edit/",uploadAvatar.single("avatar"), updateUserValidator ,userInSessionCheck ,controller.updateProfile);

module.exports = router