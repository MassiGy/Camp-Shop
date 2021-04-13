const joi = require('joi')


module.exports.campValidator = joi.object({
    campground: joi.object({
        title: joi.string().required(),
        location: joi.string().required(),
        description: joi.string().required(),
        image: joi.string().required(),
        price: joi.number().required().min(0)
    }).required()
})