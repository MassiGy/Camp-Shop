const mongoose = require('mongoose')
const Schema = mongoose.Schema;



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
    }
})



const Campground = mongoose.model('Campground', campgroundSchema)




module.exports = Campground