module.exports.renderLoginForm = (req, res) => {
    if (!req.user) {
        res.render('login.ejs')
    } else {
        req.flash('success', 'You Are Already LoggedIn! ')
    }
}


module.exports.postLogin = async(req, res) => {
    const returnTo = previousUrl || '/campgrounds';
    req.session.isSignedIn = req.body.username;
    req.flash('success', 'Successfuly Logged In')
    delete req.session.previousUrl;
    res.redirect(`${returnTo}`)
}