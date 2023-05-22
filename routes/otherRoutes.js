const express = require('express')
const router = express.Router();
const appError = require('../tools/appError')

router.get('/', (req, res) => {
    res.render('home.ejs')
})

router.get('/home', (req, res) => {
    res.render('home.ejs')
})


router.get('/aboutUs', (req, res) => {
    res.render('aboutUs.ejs')
})


router.get('/logout', (req, res) => {
    req.logOut(err => {
        if (err) {
            req.flash("error", "Something went wrong on logout ! We will work on it soon.");
            return res.redirect("/home");
        }
        req.flash("success", "Successfully Logged Out. Bye!")
        res.redirect("/campgrounds");
    });
})


router.all('*', (req, res, next) => {
    throw new appError('Not Found', 404)
})

module.exports = router;