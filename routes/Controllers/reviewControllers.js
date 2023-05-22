const Campground = require('../../modals/campground')
const Review = require('../../modals/review')
const { dataValidator, reviewValidator } = require('../../tools/validators')


module.exports.showPage = (req, res) => {

    // to view a review, we just need to view 
    // the campground that it was written for
    const { id } = req.params;
    res.redirect(`/campgrounds/${id}`)
}

module.exports.postReview = async (req, res) => {
    // validate the data
    dataValidator(reviewValidator, req.body)

    // get the campground  id from url
    const { id } = req.params;

    // create a review from the form data
    const postedReview = new Review(req.body.review);
    postedReview.owner = req.user._id;


    // modify the campround & the review concurrently
    await Promise.allSettled([
        postedReview.save(),
        Campground.updateOne({ _id: id }, { $push: { reviews: postedReview._id } })
    ]);

    // inform the user
    req.flash('success', 'Successfuly Posted Review!')
    res.redirect(`/campgrounds/${id}`)

}

module.exports.delete = async (req, res) => {

    // get the ids from the url
    const { reviewId, id } = req.params;

    // delete the review & modify the parent camp concurrently
    await Promise.allSettled([
        Review.findByIdAndDelete(reviewId),
        Campground.updateOne({ _id: id }, { $pull: { reviews: reviewId } })
    ]);

    req.flash('success', 'Successfuly Deleted Review')
    res.redirect(`/campgrounds/${id}`);
}