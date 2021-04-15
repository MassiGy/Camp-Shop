module.exports.renderLoginForm = (req, res) => {
    res.render('login.ejs')
}


module.exports.postLogin = async(req, res) => {
    req.flash('success', 'Successfuly Logged In')
    res.redirect('/campgrounds')
}