const User = require('../../modals/user')
const { userValidator, dataValidator } = require('../../tools/validators')


module.exports.renderSignoutForm = (req, res) => {

    // check if the user is already signed in
    if (req.session.isSignedIn) {

        // if so, render the signout form
        res.render('signout.ejs');
    
    } else {
        
        // otherwise, inform him that he is not signed in
        req.flash('danger', 'You Must Be SignedIn to Sign Out.')
        res.redirect('/signup')
    }
}

module.exports.signout = async(req, res) => {

    // valide the data,
    dataValidator(userValidator, req.body)

    // findOneAndDelete returns the document that is just deleted
    const foundUser = await User.findOneAndDelete({ username: req.body.user.username })

    if (!foundUser) {
        
        // if no document was found, infomr the user that his made a mistake
        req.flash('danger', 'There Is No SignedIn User With That Credentials')
        res.redirect('/signout')

    } else {
        
        // otherwise, remove the signed in flag on the session & inform the user
        req.session.isSignedIn = null;
        req.flash('success', 'Successfully Signed Out, GoodBy!')
        res.redirect('/campgrounds')
    }

}