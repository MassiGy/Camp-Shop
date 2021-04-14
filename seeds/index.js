const mongoose = require('mongoose')
const cities = require('./cities')
const { descriptors, places } = require('./titles')
const Campground = require('../modals/campground')






mongoose.connect('mongodb://localhost:27017/myApp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Seeds/index/Database connected!')
});




const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async() => {
    await Campground.deleteMany({})
    for (let i = 0; i < 6; i++) {
        const rand1000 = Math.floor(Math.random() * 1000)
        let camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            description: 'a good place to rest!',
            image: 'https://source.unsplash.com/collection/483251/1600x900',
            price: rand1000 / 10,
        })
        await camp.save()
    }
}



















seedDB()