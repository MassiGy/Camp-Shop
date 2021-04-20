const { array } = require('joi');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const passportLM = require('passport-local-mongoose')
const Campground = require('./campground')

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
    if (doc.postedCampgrounds.length > 0) {
        await Campground.deleteMany({
            _id: {
                $in: doc.postedCampgrounds
            }
        })
    }

})
const User = mongoose.model('User', userSchema)

module.exports = User;