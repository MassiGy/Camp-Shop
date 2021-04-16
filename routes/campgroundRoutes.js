const express = require('express')
const router = express.Router()
const catchAsync = require('../tools/catchAsync')
const appError = require('../tools/appError')
const { campValidator } = require('../tools/validators')
const campgroundControllers = require('./Controllers/campgroundControllers')






const validateCamp = (req, res, next) => {
    const { error } = campValidator.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new appError(msg, 400)
    } else {
        next()
    }
}








router.get('/', catchAsync(campgroundControllers.allCamps))

router.get('/new', campgroundControllers.renderNewForm)

router.get('/:id', catchAsync(campgroundControllers.showPage))

router.get('/:id/edit', catchAsync(campgroundControllers.renderEditForm))



















router.post('/new', validateCamp, catchAsync(campgroundControllers.postNewCamp))

router.patch('/:id', validateCamp, catchAsync(campgroundControllers.postEditCamp))

router.delete('/:id', catchAsync(campgroundControllers.deleteCamp))

router.post('/search', catchAsync(campgroundControllers.search))


module.exports = router;