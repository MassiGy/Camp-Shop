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
    delete req.session.previousUrl;
    req.flash('success', 'Successfuly LoggedIn, Welcome!')
    res.redirect(`${returnTo}`)
}