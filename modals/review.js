const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');


const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: true,
    },
    reviewBody: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },


})


const Review = mongoose.model('Review', reviewSchema)
module.exports = Review;