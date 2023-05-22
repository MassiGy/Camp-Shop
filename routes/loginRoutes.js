const express = require('express')
const router = express.Router()
const catchAsync = require('../tools/catchAsync')
const loginControllers = require('./Controllers/loginControllers')
const passport = require('passport')
const passportAuthConfig = { failureFlash: true, failureRedirect: '/login' }

router.get('/', loginControllers.renderLoginForm)

router.post(
    '/',
    passport.authenticate('local', passportAuthConfig),
    catchAsync(loginControllers.postLogin)
)


module.exports = router;