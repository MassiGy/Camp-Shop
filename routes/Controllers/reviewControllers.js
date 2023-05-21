const Campground = require('../../modals/campground')
const Review = require('../../modals/review')
const { dataValidator, reviewValidator } = require('../../tools/validators')


module.exports.showPage = (req, res) => {
    const { id } = req.params;
    res.redirect(`/campgrounds/${id}`)
}

module.exports.postReview = async(req, res) => {
    dataValidator(reviewValidator, req.body)
   
    const { id } = req.params;
   
    const parentCamp = await Campground.findById(id)
   
    if (parentCamp) {
   
        const postedReview = new Review(req.body.review);
        postedReview.owner = req.user._id;
        parentCamp.reviews.unshift(postedReview)
        
        await Promise.allSettled([
            await postedReview.save(),
            await parentCamp.save()
        ])
        
        
        req.flash('success', 'Successfuly Posted Review!')
        res.redirect(`/campgrounds/${id}`)
   
    } else {
   
        req.flash('danger', 'Camp Not Found')
        res.redirect('/campgrounds')
   
    }
}

module.exports.delete = async(req, res) => {
    const { reviewId, id } = req.params;
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Successfuly Deleted Review')
    res.redirect(`/campgrounds/${id}`);
}