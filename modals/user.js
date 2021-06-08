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
    }, ]
})
userSchema.plugin(passportLM)


userSchema.post('findOneAndDelete', async(doc) => {
    await Review.deleteMany({ owner: doc._id });
    if (doc.postedCampgrounds.length > 0) {
        doc.postedCampgrounds.forEach(async(el) => {
            await Campground.findByIdAndDelete(el);
        });
    }

})


module.exports = mongoose.model('User', userSchema)