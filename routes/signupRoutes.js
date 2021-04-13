const express = require('express')
const router = express.Router()
const signupControllers = require('./Controllers/signupControllers')


router.get('/', signupControllers.renderSignupForm)
router.post('/', signupControllers.postSignup)



module.exports = router;