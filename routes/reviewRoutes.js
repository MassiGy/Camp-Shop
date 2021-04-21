const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../tools/catchAsync')
const reviewControllers = require('./Controllers/reviewControllers')
const { isLoggedIn, isOwner } = require('./middelwares/authMiddelwares')

router.post('/new', isLoggedIn, catchAsync(reviewControllers.postReview))
router.delete('/:reviewId', isLoggedIn, isOwner, catchAsync(reviewControllers.delete))


module.exports = router;