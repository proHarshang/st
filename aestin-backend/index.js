const express = require('express');
const productsRouter = require('./routes/Products');
const customersRouter = require('./routes/Customers');
const careerApplyRouter = require('./routes/CareerApply');
const careersRouter = require('./routes/Careers');
const { Customer } = require('./model/Customers');
const http = require('http');
const https = require('https');
const fs = require('fs');
const session = require('express-session');
const stripe = require("./routes/checkout");
const createCheckoutSession = require('./routes/checkout');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

const mongoose = require('mongoose');

const server = express();

// const options = {
//     key: fs.readFileSync('server.key'),
//     cert: fs.readFileSync('server.cert')
// };

server.use(express.json());

server.use(cors({
    origin: ['http://127.0.0.1:3000', process.env.CLIENT_URL],
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials: true
}));

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next(); // Call next to move to the next middleware/route handler
});
server.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

server.use(passport.initialize());
server.use(passport.session());

passport.use(
    new GoogleStrategy({
        callbackURL: '/customer/auth/google/callback',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        scope: ['profile', 'email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await Customer.findOne({ email: profile.emails[0].value });
            if (!user) {
                // User does not exist, register new user
                user = new Customer({
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    date: new Date(),
                });
                await user.save();
            }
            return done(null, user);

        } catch (error) {
            return done(error);
        }

    })
)

passport.use(
    new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/customer/auth/facebook/callback",
        profileFields: ['first_name', 'last_name', 'email']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await Customer.findOne({ email: profile.emails[0].value });
            console.log(profile)
            if (!user) {
                // User does not exist, register new user
                user = new Customer({
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    date: new Date(),
                });
                await user.save();
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Customer.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});



// Define routes
server.get('/', (req, res) => {
    res.json({ status: 'success' });
});

server.use('/products', productsRouter);
server.use('/customer', customersRouter);
server.use('/career', careersRouter);
server.use('/careerApply', careerApplyRouter);
server.use('/stripe', stripe);

server.use(express.static("./aestin/build"));
server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "aestin", "build", "index.html"))
})

// Start the server
const PORT = process.env.PORT || 3001;

// https.createServer(options, server).listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });


server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});