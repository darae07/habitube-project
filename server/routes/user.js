const express = require('express');
const router = express.Router();

const { userController } = require('../controller');

// * POST /login
router.post('/login', userController.login.post);

// * POST /signout
router.post('/signout', userController.signout.post);

// * POST /signup
router.post('/signup', userController.signup.post);

module.exports = router;
