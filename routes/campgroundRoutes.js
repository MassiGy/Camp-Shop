const express = require('express')
const router = express.Router()
const catchAsync = require('../tools/catchAsync')
const campgroundControllers = require('./Controllers/campgroundControllers')
const { isLoggedIn, isAuthor } = require('./middelwares/authMiddelwares')














router.get('/', catchAsync(campgroundControllers.allCamps))

router.get('/new', isLoggedIn, campgroundControllers.renderNewForm)

router.get('/:id', catchAsync(campgroundControllers.showPage))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundControllers.renderEditForm))



















router.post('/new', isLoggedIn, catchAsync(campgroundControllers.postNewCamp))

router.patch('/:id', isLoggedIn, catchAsync(campgroundControllers.postEditCamp))

router.delete('/:id', isLoggedIn, catchAsync(campgroundControllers.deleteCamp))

router.post('/search', catchAsync(campgroundControllers.search))


module.exports = router;