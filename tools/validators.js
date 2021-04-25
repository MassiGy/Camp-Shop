const appError = require('./appError')
const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const joi = BaseJoi.extend(extension)





module.exports.campValidator = joi.object({
    campground: joi.object({
        title: joi.string().required().escapeHTML(),
        location: joi.string().required().escapeHTML(),
        description: joi.string().required().escapeHTML(),
        image: joi.object({
            url: joi.string().required(),
            filename: joi.string().required(),
        }),
        price: joi.number().required().min(0)
    }).required()
})


module.exports.userValidator = joi.object({

    user: joi.object({
        username: joi.string().required().escapeHTML(),
        email: joi.string().required().escapeHTML(),
        password: joi.string().required().escapeHTML(),
    }).required()

})

module.exports.reviewValidator = joi.object({
    review: joi.object({
        rating: joi.number().min(0).max(5).required(),
        reviewBody: joi.string().required().escapeHTML(),
    }).required()
})

module.exports.dataValidator = (modelValidators, data) => {
    let { error } = modelValidators.validate(data);
    if (error) {
        throw new appError(error, 400)
    }

}