const User = require('../../modals/user');
const { userValidator, dataValidator } = require('../../tools/validators')

module.exports.renderSignupForm = (req, res) => {

    // check if the session contains user data
    if (req.session.isSignedIn != null) {
  
        // if so, the user does not need to sign in
        req.flash('success', 'You are Already SignedIn')
        res.redirect('/campgrounds')
  
    } else {
        // otherwise, render signup
        res.render('signup.ejs')
    }
}


module.exports.postSignup = async(req, res) => {

    // valide the data, 
    dataValidator(userValidator, req.body);
    
    // extract the credentials from the submitted data
    const { email, username, password } = req.body.user;
    
    // check for any user on db with the same username
    const fetchedUser = await User.findOne({ username })
    
    
    if (!fetchedUser) {
        
        // if the username is not already taken, add the current user
        const newUser = new User({ email, username });

        // register the user via passport to create the hash & salt
        const newSignup = await User.register(newUser, password)
        
        // setup the isSigned flag on the session
        req.session.isSignedIn = newSignup.username
        
        // log the user to persist his authenticated state
        req.login(newSignup, (err) => {
            
            // if error, inform the user
            if (err) {
                req.flash('danger', err);
                res.redirect('/campgrounds')
            }
            
            // otherwise, inform the user that he is logged in & redirect
            req.flash('success', 'Successfully SignedIn & LoggedIn')
            res.redirect('/campgrounds')
        });
        
    } else {

        // if the username is already taken, inform the user & redirect
        req.flash('danger', 'Username  Already taken')
        res.redirect('/Signup')
    }

}