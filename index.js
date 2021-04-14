const express = require('express')
const app = express()
const path = require('path')
const methodOverRide = require('method-override')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const seedDB = require('./seeds/index.js')
const flash = require('connect-flash')
const session = require('express-session')
const sessionConfig = { secret: 'secret', resave: false, saveUninitialized: false }
const appError = require('./tools/appError')
const passport = require('passport')
const localStrategy = require('passport-local');
const passportLM = require('passport-local-mongoose')
const User = require('./modals/user')
const campgroundRoutes = require('./routes/campgroundRoutes')
const loginRoutes = require('./routes/loginRoutes')
const signupRoutes = require('./routes/signupRoutes')




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
app.use(passport.initialize())
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())






app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.danger = req.flash('danger')
    res.locals.passport = req.flash('error')
    isSignedIn = req.session.isSignedIn
    next();
})

app.use('/campgrounds', campgroundRoutes)
app.use('/login', loginRoutes)
app.use('/signup', signupRoutes)

app.all('*', (req, res, next) => {
    throw new appError('Not Found', 404)
})

app.use((err, req, res, next) => {
    res.render('error', { err })
})

app.listen(3000, (req, res) => {
    console.log('Listning on port 3000')
})