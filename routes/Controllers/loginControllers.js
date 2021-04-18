module.exports.renderLoginForm = (req, res) => {
    res.render('login.ejs')
}


module.exports.postLogin = async(req, res) => {
    const returnTo = previousUrl || '/campgrounds';
    req.session.isSignedIn = req.body.username;
    req.flash('success', 'Successfuly Logged In')
    delete req.session.previousUrl;
    res.redirect(`${returnTo}`)
}