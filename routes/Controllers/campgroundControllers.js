const Campground = require('../../modals/campground');
const User = require('../../modals/user');
const { dataValidator, campValidator } = require('../../tools/validators')
const { cloudinary } = require('../../cloudinary/index')
const mbxSdk = require('@mapbox/mapbox-sdk');
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

module.exports.allCamps = async(req, res) => {
    const campgrounds = await Campground.find({});
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
    newCamp.image = new Object({
        url: req.file.path,
        filename: req.file.filename
    })
    const user = await User.findOne(req.user);
    user.postedCampgrounds.push(newCamp);

    await newCamp.save();
    await user.save()
    req.flash('success', 'Successfully Created Campground');
    res.redirect(`/campgrounds/${newCamp._id}`)

}

module.exports.postEditCamp = async(req, res) => {
    dataValidator(campValidator, req.body);
    let { id } = req.params;
    req.body.campground.image = new Object({
        url: req.file.path,
        filename: req.file.filename
    })

    let theCampToEdit = await Campground.findByIdAndUpdate(id, req.body.campground, { runValidators: true })
    await cloudinary.uploader.destroy(theCampToEdit.image.filename)
    req.flash('success', 'Successfully Uptaded Campground')
    res.redirect(`/campgrounds/${theCampToEdit._id}`)

}



module.exports.deleteCamp = async(req, res) => {
    let { id } = req.params;
    const campToDelete = await Campground.findByIdAndDelete(id)
    await cloudinary.uploader.destroy(campToDelete.image.filename)
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