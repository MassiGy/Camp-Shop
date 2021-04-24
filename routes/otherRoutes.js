const express = require('express')
const router = express.Router();
const appError = require('../tools/appError')

router.get('/home', (req, res) => {
    res.redirect('/campgrounds')
})
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success', 'Successfully Logged Out, By!')
    res.redirect('/campgrounds')
})


router.all('*', (req, res, next) => {
    throw new appError('Not Found', 404)
})

module.exports = router;