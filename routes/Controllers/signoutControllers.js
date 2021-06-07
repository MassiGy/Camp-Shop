const User = require('../../modals/user')
const { userValidator, dataValidator } = require('../../tools/validators')


module.exports.renderSignoutForm = (req, res) => {
    if (isSignedIn) {
        res.render('signout.ejs')
    } else {
        req.flash('danger', 'You Must Be SignedIn ')
        res.redirect('/signup')
    }
}

module.exports.signout = async(req, res) => {
    dataValidator(userValidator, req.body)
    const foundUser = await User.findOne({ username: req.body.user.username })
    if (!foundUser) {
        req.flash('danger', 'There Is No SignedIn User With That Credentials')
        res.redirect('/signout')
    } else {
        await User.findOneAndDelete({ username: req.body.user.username })
        req.session.isSignedIn = null;
        req.flash('success', 'Successfully Signed Out, GoodBy!')
        res.redirect('/campgrounds')
    }

}