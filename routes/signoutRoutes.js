const express = require('express')
const router = express.Router();
const catchAsync = require('../tools/catchAsync')
const signoutControllers = require('./Controllers/signoutControllers')




router.get('/', signoutControllers.renderSignoutForm)
router.post('/', catchAsync(signoutControllers.signout))








module.exports = router;