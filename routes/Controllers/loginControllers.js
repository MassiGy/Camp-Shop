module.exports.renderLoginForm = (req, res) => {
    
    // check if the user is not loggedin
    if (!req.user) {

        // if so, render the login form
        res.render('login.ejs')
    } else {

        // otherwise, infrom him that he is already loggedin
        req.flash('success', 'You Are Already LoggedIn! ')
    }
}


module.exports.postLogin = async(req, res) => {

    // set the returnTo behavior (default = /campgrounds)
    const returnTo = req.session.previousUrl || '/campgrounds';
    
    // once the user is logged in, add the username to the session
    req.session.isSignedIn = req.body.username;
    
    // override the session previous url store
    delete req.session.previousUrl;
    
    // redirect to the return to page
    req.flash('success', 'Successfuly LoggedIn, Welcome!')
    res.redirect(`${returnTo}`)
}