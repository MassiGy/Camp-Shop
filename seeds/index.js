const mongoose = require('mongoose')
const cities = require('./cities')
const { descriptors, places } = require('./titles')
const Campground = require('../modals/campground')
const dbUrl = process.env.dataBaseUrl || 'mongodb://localhost:27017/myApp';






mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Seeds/index/Database connected!')
});




const sample = array => array[Math.floor(Math.random() * array.length)]





const seedDB = async() => {
    await Campground.deleteMany({});

    for (let i = 0; i < 100; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60896b4f70665c0f88e76507',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            image: {
                url: "https://res.cloudinary.com/https-res-cloudinary-com-massigy-images/image/upload/v1619880040/CampShop/AdminPictures/NFP_Campground_A80U1788_afmwtd.jpg",
                filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
            },
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})