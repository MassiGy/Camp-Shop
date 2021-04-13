const express = require('express')
const router = express.Router()
const catchAsync = require('../tools/catchAsync')
const appError = require('../tools/appError')
const loginControllers = require('./Controllers/loginControllers')


router.get('/', loginControllers.renderLoginForm)
router.post('/', loginControllers.postLogin)



module.exports = router;