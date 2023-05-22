/// Setting the .env file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}



/// import express 
const express = require('express')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')

/// import mongoose 
const mongoSanitize = require('express-mongo-sanitize');
const mongoose = require('mongoose')

/// import helmet & our http methods override
const helmet = require("helmet");
const methodOverRide = require('method-override')

// import session & flashes
const session = require('express-session')
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');

// import passport
const passport = require('passport')
const localStrategy = require('passport-local');

// import our modals
const User = require('./modals/user')

// import our routers
const campgroundRoutes = require('./routes/campgroundRoutes')
const loginRoutes = require('./routes/loginRoutes')
const signupRoutes = require('./routes/signupRoutes')
const otherRoutes = require('./routes/otherRoutes')
const signoutRoutes = require('./routes/signoutRoutes')
const reviewRoutes = require('./routes/reviewRoutes')


/// App Configs Variable
const dbUrl = process.env.dataBaseUrl || 'mongodb://localhost:27017/myApp';
const port = process.env.PORT || 8080;
const sessionName = process.env.sessionName || 'u.controllers';
const sessionSecret = process.env.sessionSecret || 'u.controllers.token';


// setup the session store (lazy resave set for 7 days)
const store = new MongoStore({
    mongoUrl: dbUrl,
    touchAfter: 7 * 24 * 60 * 60,
    secret: sessionSecret,
})

// setup the session config (cookie max age == lazy resave cycle lenght)
const sessionConfig = {
    store: store,
    secret: sessionSecret,
    name: sessionName,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: process.env.NODE_ENV == 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }

}




///Connecting to  the Data Base 

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Index.js/Database connected!')
});




/// App Configs Middelwares


app.use(express.urlencoded({ extended: true }))
app.use(mongoSanitize())
app.use(helmet({ contentSecurityPolicy: false }));
app.use(methodOverRide('_method'))
app.use(express.json());

// setup the views & the static files
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static('public'))

// setup the session before flash and passport
app.use(session(sessionConfig))
app.use(flash())

// setup passport with a localstrategy (auth with our database)
app.use(passport.initialize())
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    // append the flash messages to res.locals 
    // in order to access them from the views 
    res.locals.success = req.flash('success')
    res.locals.danger = req.flash('danger')
    res.locals.passport = req.flash('error')
    
    // set the activeUser flag, to map the user authentication to the UI
    res.locals.activeUser = req.user;
       
    return next();
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