module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.previousUrl = req.originalUrl;
        req.flash('danger', 'You Must Be LoggedIn !')
        res.redirect('/login')
    } else {
        next()
    }
}