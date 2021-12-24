const Campground = require('../../modals/campground');
const User = require('../../modals/user');
const { dataValidator, campValidator } = require('../../tools/validators')
const { cloudinary } = require('../../cloudinary/index')
const mbxSDK = require('@mapbox/mapbox-sdk');
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mbxToken = process.env.mapbox_token;
const geoCoder = mbxGeoCoding({ accessToken: mbxToken })



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
    const theCampground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'owner',
            modal: User,
        }
    })
    res.render('theCampground.ejs', { theCampground })
}




module.exports.postNewCamp = async(req, res) => {
    dataValidator(campValidator, req.body);


    const geoData = await geoCoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1,
    }).send()


    const newCamp = await new Campground(req.body.campground);
    newCamp.geometry = geoData.body.features[0].geometry
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

    const geoData = await geoCoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1,
    }).send()

    let { id } = req.params;

    req.body.campground.geometry = geoData.body.features[0].geometry
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
    const fetchedUser = await User.findById(campToDelete.author)
    let campToDeleteIndex = fetchedUser.postedCampgrounds.indexOf(campToDelete._id)
    fetchedUser.postedCampgrounds.splice(campToDeleteIndex, 1)
    await fetchedUser.save()
    await cloudinary.uploader.destroy(campToDelete.image.filename)
    req.flash('success', 'Successfully Deleted Campground')
    res.redirect(`/campgrounds`)
}


module.exports.search = async(req, res) => {
    const { searchedInput } = req.body
    const campgrounds = await Campground.find({ location: { $regex: `.*${searchedInput}.*` } })
    if (campgrounds.length > 0) {
        res.render('campgrounds.ejs', { campgrounds })
    } else {
        req.flash('danger', 'Not Found (Please Search by Location)');
        res.redirect('/campgrounds')
    }
}



// for the new version of the app -- camp-shop-redesign.herokuapp.com


module.exports.get_all_camp_json = async(req, res) => {
    const campgrounds = await Campground.find({})
    .select("-image -description -author -reviews -geometry -properties");
    // the select method will take the queried documents and exclude or include feilds
    // look up the select method on the mongoose docs
    res.status(200).send(campgrounds);
}






module.exports.query_then_send = async(req, res) => {
    const { query } = req.params;
    const campgrounds = await Campground.find({ location: { $regex: `.*${query}.*`, $options : 'i'} })
    .select("-image -description -author -reviews -geometry -properties");
    if (campgrounds.length > 0) {
        res.status(200).send( campgrounds );
    } else {
        res.status(404).send({
            "error": "Nothing Was Found"
        });
    }
}