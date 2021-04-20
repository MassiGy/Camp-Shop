const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Review = require('./review');

const campgroundSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }, ]
})


campgroundSchema.post('findOneAndDelete', async(doc) => {
    if (doc.reviews.length > 0) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

campgroundSchema.post('deleteMany', async(doc) => {
    if (doc.reviews.length > 0) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

const Campground = mongoose.model('Campground', campgroundSchema)









module.exports = Campground