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




const User = mongoose.model('User', userSchema)

userSchema.post('findOneAndDelete', async(doc) => {
    req.session.isSignedIn = null;
    Campground.deleteMany({
        _id: {
            $in: doc.postedCampgrounds
        }
    })
})


module.exports = User;