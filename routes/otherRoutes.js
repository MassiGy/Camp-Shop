const express = require('express')
const router = express.Router();


router.get('/home', (req, res) => {
    res.redirect('/campgrounds')
})
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success', 'Successfully Logged Out, By!')
    res.redirect('/campgrounds')
})


module.exports = router;