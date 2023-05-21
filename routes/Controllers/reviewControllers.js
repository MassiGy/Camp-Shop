const Campground = require('../../modals/campground')
const Review = require('../../modals/review')
const { dataValidator, reviewValidator } = require('../../tools/validators')


module.exports.showPage = (req, res) => {

    // to view a review, we just need to view 
    // the campground that it was written for
    const { id } = req.params;
    res.redirect(`/campgrounds/${id}`)
}

module.exports.postReview = async(req, res) => {
    // validate the data
    dataValidator(reviewValidator, req.body)
    
    // get the campground using the url id
    const { id } = req.params;
    const parentCamp = await Campground.findById(id)
   
    if (parentCamp) {
        
        // if any campground was found, add a review to it
        const postedReview = new Review(req.body.review);
        postedReview.owner = req.user._id;
        parentCamp.reviews.unshift(postedReview)
        
        // save the campround & the review concurrently
        await Promise.allSettled([
            await postedReview.save(),
            await parentCamp.save()
        ])
        
        // inform the user
        req.flash('success', 'Successfuly Posted Review!')
        res.redirect(`/campgrounds/${id}`)
   
    } else {
        
        // if no campground found, inform user that review couldn't be added
        req.flash('danger', 'Camp Not Found')
        res.redirect('/campgrounds')
   
    }
}

module.exports.delete = async(req, res) => {

    // get the ids from the url
    const { reviewId, id } = req.params;
   
    // delete the review if any, then redirect
    await Review.findByIdAndDelete(reviewId)
   
    req.flash('success', 'Successfuly Deleted Review')
    res.redirect(`/campgrounds/${id}`);
}