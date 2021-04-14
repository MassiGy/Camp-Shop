const express = require('express')
const router = express.Router();
const catchAsync = require('../tools/catchAsync')
const signupControllers = require('./Controllers/signupControllers')

router.get('/', signupControllers.renderSignupForm)
router.post('/', catchAsync(signupControllers.postSignup))



module.exports = router;