const express = require('express')
const router = express.Router()
const catchAsync = require('../tools/catchAsync')
const campgroundControllers = require('./Controllers/campgroundControllers')
const { isLoggedIn, isAuthor } = require('./middelwares/authMiddelwares')
const multer = require('multer')
const { storage } = require('../cloudinary/index')
const upload = multer({ storage })









// for the new version of the app -- camp-shop-redesign


router.get('/get_json', catchAsync(campgroundControllers.get_all_camp_json));
router.get('/search/:query', catchAsync(campgroundControllers.query_then_send));
//////////////////////////////


router.get('/', catchAsync(campgroundControllers.allCamps))
router.get('/new', isLoggedIn, campgroundControllers.renderNewForm)

router.get('/:id', catchAsync(campgroundControllers.showPage))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundControllers.renderEditForm))



router.post('/new', isLoggedIn, upload.single('campground[image]'), catchAsync(campgroundControllers.postNewCamp))

router.patch('/:id', isLoggedIn, isAuthor, upload.single('campground[image]'), catchAsync(campgroundControllers.postEditCamp))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgroundControllers.deleteCamp))

router.post('/search', catchAsync(campgroundControllers.search))









module.exports = router;