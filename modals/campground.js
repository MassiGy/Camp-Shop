const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Review = require('./review')
const opts = { toJSON: { virtuals: true } };





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
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
    },
    location: {
        type: String,
        required: true,
    },
    image: {
        url: String,
        filename: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }, ]
}, opts)


campgroundSchema.virtual('properties.onMapPupUp').get(function() {
    return `<a href="/campgrounds/${this._id}">Visit ${this.title}</a>`
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

module.exports = mongoose.model('Campground', campgroundSchema)