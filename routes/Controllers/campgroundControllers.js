const Campground = require('../../modals/campground');
const User = require('../../modals/user');
const { dataValidator, campValidator } = require('../../tools/validators')
module.exports.allCamps = async(req, res) => {
    const campgrounds = await Campground.find({}).populate('reviews');
    res.render('campgrounds.ejs', { campgrounds })
}
module.exports.renderNewForm = (req, res) => {
    res.render('createCampground.ejs')
}
module.exports.renderEditForm = async(req, res) => {
    const theCampground = await Campground.findById(req.params.id)
    res.render('editCampground.ejs', { theCampground })
}

module.exports.showPage = async(req, res) => {
    const theCampground = await Campground.findById(req.params.id).populate('reviews')
    res.render('theCampground.ejs', { theCampground })
}
module.exports.postNewCamp = async(req, res) => {
    dataValidator(campValidator, req.body);
    const newCamp = await new Campground(req.body.campground);
    newCamp.author = req.user._id;
    await newCamp.save();
    const user = await User.findOne(req.user);
    user.postedCampgrounds.push(newCamp);
    await user.save()
    console.log(user)
    req.flash('success', 'Successfully Created Campground');
    res.redirect(`/campgrounds/${newCamp._id}`)
}

module.exports.postEditCamp = async(req, res) => {
    dataValidator(campValidator, req.body);
    let { id } = req.params;
    let theCampToEdit = await Campground.findByIdAndUpdate(id, req.body.campground, { runValidators: true })
    req.flash('success', 'Successfully Uptaded Campground')
    res.redirect(`/campgrounds/${theCampToEdit._id}`)

}



module.exports.deleteCamp = async(req, res) => {
    let { id } = req.params;
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Successfully Deleted Campground')
    res.redirect(`/campgrounds`)
}


module.exports.search = async(req, res) => {
    const { searchedInput } = req.body
    const campgrounds = await Campground.find({ location: searchedInput })
    if (campgrounds.length > 0) {
        res.render('campgrounds.ejs', { campgrounds })
    } else {
        req.flash('danger', 'Not Found (Please Insert Location As : City, State)');
        res.redirect('/campgrounds')
    }
}