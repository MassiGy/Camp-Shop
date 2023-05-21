const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const passportLM = require('passport-local-mongoose')
const Campground = require('./campground')
const Review = require('./review');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    postedCampgrounds: [{
        type: Schema.Types.ObjectId,
        ref: 'Campground',
    },]
})
userSchema.plugin(passportLM)


userSchema.post('findOneAndDelete', async (doc) => {
    // no need to await, this will be done after the task queue is empty
    // if awaited, it will slow down the call stack
    Review.deleteMany({ owner: doc._id });
    doc.postedCampgrounds.forEach(el => Campground.findByIdAndDelete(el));
})


module.exports = mongoose.model('User', userSchema)