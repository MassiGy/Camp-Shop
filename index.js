/// Setting the .env file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}



/// Requiring the Needed Packages & Config
const express = require('express')
const app = express()
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const path = require('path')
const methodOverRide = require('method-override')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const multer = require('multer')
const flash = require('connect-flash')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('passport')
const localStrategy = require('passport-local');
const User = require('./modals/user')
const campgroundRoutes = require('./routes/campgroundRoutes')
const loginRoutes = require('./routes/loginRoutes')
const signupRoutes = require('./routes/signupRoutes')
const otherRoutes = require('./routes/otherRoutes')
const signoutRoutes = require('./routes/signoutRoutes')
const reviewRoutes = require('./routes/reviewRoutes')


/// App Configs Variable
const dbUrl = process.env.dataBaseUrl || 'mongodb://localhost:27017/myApp';
const port = process.env.PORT || 3000;
const sessionName = process.env.sessionName || 'u.controllers'
const sessionSecret = process.env.sessionSecret || 'u.controllers.token'
const store = new MongoStore({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    secret: sessionSecret,
})
const sessionConfig = {
    store: store,
    secret: sessionSecret,
    name: sessionName,
    resave: false,
    saveUninitialized: false,
    Cookie: {
        secure: true,
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    }

}




///Connecting to  the Data Base 

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('App.js/Database connected!')
});




/// App Configs Middelwares

app.engine('ejs', ejsMate)
app.use(express.urlencoded({ extended: true }))
app.use(mongoSanitize())
app.use(helmet({ contentSecurityPolicy: false }));
app.use(methodOverRide('_method'))
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static('public'))
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
    res.locals.activeUser = req.user;
    isSignedIn = req.session.isSignedIn;
    previousUrl = req.session.previousUrl;
    next();
})




/// Routes Hundlers
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)
app.use('/signup', signupRoutes)
app.use('/login', loginRoutes)
app.use('/signout', signoutRoutes)
app.use('/', otherRoutes)







app.use((err, req, res, next) => {
    res.render('error', { err })
})
app.listen(port, (req, res) => {
    console.log(`Listning on port  ${port}`)
})