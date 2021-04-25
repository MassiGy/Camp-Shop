const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');



cloudinary.config({
    cloud_name: process.env.cloudinary_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret

})

const storage = new CloudinaryStorage({
    cloudinary,
    folder: 'CampShop',
    allowedFormats: ['jpeg', 'png', 'jpg']
})


module.exports = { storage, cloudinary }