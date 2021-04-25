const express = require('express')
const router = express.Router()
const catchAsync = require('../tools/catchAsync')
const campgroundControllers = require('./Controllers/campgroundControllers')
const { isLoggedIn, isAuthor } = require('./middelwares/authMiddelwares')
const multer = require('multer')
const { storage } = require('../cloudinary/index')
const upload = multer({ storage })













router.get('/', catchAsync(campgroundControllers.allCamps))

router.get('/new', campgroundControllers.renderNewForm)

router.get('/:id', catchAsync(campgroundControllers.showPage))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundControllers.renderEditForm))



router.post('/new', upload.single('image'), (req, res) => {
    console.log(req.body, req.file)
    res.send('sent!')
})

// router.post('/new', isLoggedIn, catchAsync(campgroundControllers.postNewCamp))
router.patch('/:id', isLoggedIn, isAuthor, catchAsync(campgroundControllers.postEditCamp))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgroundControllers.deleteCamp))

router.post('/search', catchAsync(campgroundControllers.search))


module.exports = router;