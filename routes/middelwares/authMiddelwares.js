const Campground = require("../../modals/campground");
const Review = require('../../modals/review')

module.exports.isLoggedIn = (req, res, next) => {

    // use the passport method to see if the user is authenticated
    if (!req.isAuthenticated()) {

        // if no, redirect to login
        req.session.previousUrl = req.originalUrl;
        req.flash('danger', 'You Must Be LoggedIn !')
        res.redirect('/login')

    } else {
        // otherwise, go to next middleware
        return next()
    }
}


module.exports.isAuthor = async (req, res, next) => {
    // campground id from the params
    const { id } = req.params;

    // get the campground from the db
    const fetchedCamp = await Campground.findById(id)

    // check that the current user is the author
    if (fetchedCamp.author.equals(req.user._id)) {

        // if so, go to next
        return next();

    } else {

        // otherwise, back to home
        req.flash('danger', 'Not Allowed !')
        res.redirect('/campgrounds')
    }
}

module.exports.isOwner = async (req, res, next) => {

    // get the review id & the campground id from the url
    const { reviewId, id } = req.params;

    // get the review from the database
    const fetchedReview = await Review.findById(reviewId)

    // check if the user is active and it is the owner of the review
    if (req.user && req.user._id.equals(fetchedReview.owner)) {

        // if so, move on
        return next();

    } else {

        // otherwise, inform the user & redirect to campground
        req.flash('danger', 'Not Allowed !')
        res.redirect(`/campgrounds/${id}`)
    }
}