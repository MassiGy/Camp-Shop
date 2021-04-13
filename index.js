const express = require('express')
const path = require('path')
const methodOverRide = require('method-override')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const app = express()
const seedDB = require('./seeds/index')
const session = require('express-session')
const sessionConfig = { secret: 'secret', resave: false, saveUninitialized: false }
const flash = require('connect-flash')
const appError = require('./tools/appError')
const campgroundRoutes = require('./routes/campgroundRoutes')




mongoose.connect('mongodb://localhost:27017/myApp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('App.js/Database connected!')
});

app.engine('ejs', ejsMate)
app.use(express.urlencoded({ extended: true }))
app.use(methodOverRide('_method'))
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session(sessionConfig))
app.use(flash())







app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.danger = req.flash('danger')
})

app.use('/campgrounds', campgroundRoutes)


app.all('*', (req, res, next) => {
    throw new appError('Not Found', 404)
})

app.use((err, req, res, next) => {
    res.render('error', { err })
})

app.listen(3000, (req, res) => {
    console.log('Listning on port 3000')
})