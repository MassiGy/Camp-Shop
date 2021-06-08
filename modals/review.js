const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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


module.exports = mongoose.model('Review', reviewSchema)