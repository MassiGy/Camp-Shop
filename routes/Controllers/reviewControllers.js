const Campground = require('../../modals/campground')
const Review = require('../../modals/review')
const { dataValidator, reviewValidator } = require('../../tools/validators')


module.exports.postReview = async(req, res) => {
    dataValidator(reviewValidator, req.body)
    const { id } = req.params;
    const parentCamp = await Campground.findById(id)
        .then(async() => {

            if (parentCamp) {
                const postedReview = new Review(req.body.review);
                postedReview.owner = req.user._id;
                await postedReview.save()
                parentCamp.reviews.push(postedReview)
                await parentCamp.save()
                req.flash('success', 'Successfuly Posted Review!')
                res.redirect(`/campgrounds/${id}`)
            } else {
                req.flash('danger', 'Camp Not Found')
                res.redirect('/campgrounds')
            }
        })
        .catch(e => {
            req.flash('danger', e.message)
            res.redirect('/campgrounds')
        })
}

module.exports.delete = async(req, res) => {
    const { reviewId, id } = req.params;
    await Review.findByIdAndDelete(reviewId)
        .then(() => {
            req.flash('success', 'Successfuly Deleted Review')
            res.redirect(`/campgrounds/${id}`);
        })
        .catch(e => {
            req.flash('danger', e.message)
            res.redirect(`/campgrounds/${id}`)
        })
}