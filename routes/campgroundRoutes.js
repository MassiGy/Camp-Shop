const express = require('express')
const router = express.Router()
const Campground = require('../modals/campground')
const catchAsync = require('../tools/catchAsync')
const appError = require('../tools/appError')
const { campValidator } = require('../tools/validators')







const validateCamp = (req, res, next) => {
    const { error } = campValidator.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new appError(msg, 400)
    } else {
        next()
    }
}








router.get('/', catchAsync(async(req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds.ejs', { campgrounds })
}))

router.get('/new', (req, res) => {
    res.render('createCampground.ejs')
})

router.get('/:id', catchAsync(async(req, res) => {
    const theCampground = await Campground.findById(req.params.id)
    res.render('theCampground.ejs', { theCampground })
}))

router.get('/:id/edit', catchAsync(async(req, res) => {
    const theCampground = await Campground.findById(req.params.id)
    res.render('editCampground.ejs', { theCampground })
}))



















router.post('/new', validateCamp, catchAsync(async(req, res) => {
    await Campground.insertMany(req.body.campground)
    const newCampground = await Campground.findOne(req.body.campground);
    req.flash('success', 'Successfully Created Campground');
    res.redirect(`/campgrounds/${newCampground._id}`)
}))

router.patch('/:id', validateCamp, catchAsync(async(req, res) => {
    let { id } = req.params;
    let theCampToEdit = await Campground.findByIdAndUpdate(id, req.body.campground, { runValidators: true })
    req.flash('success', 'Successfully Uptaded Campground')
    res.redirect(`/campgrounds/${theCampToEdit._id}`)

}))

router.delete('/:id', catchAsync(async(req, res) => {
    let { id } = req.params;
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Successfully Deleted Campground')
    res.redirect(`/campgrounds`)
}))




module.exports = router;