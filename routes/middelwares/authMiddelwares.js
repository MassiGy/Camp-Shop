const Campground = require("../../modals/campground");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.previousUrl = req.originalUrl;
        req.flash('danger', 'You Must Be LoggedIn !')
        res.redirect('/login')
    } else {
        next()
    }
}


module.exports.isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const fetchedCamp = await Campground.findById(id)
    if (fetchedCamp.author.equals(req.user._id)) {
        next();
    } else {
        req.flash('danger', 'Not Allowed !')
        res.redirect('/campgrounds')
    }
}