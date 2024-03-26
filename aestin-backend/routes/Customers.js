const express = require('express');
const { register, fetchAllCustomers, generateDummyProducts, contact, getVisitorsRegion, verifyOtp, deleteUser, updatePassword, google_callback, facebook_callback, deleteAllProducts, forgotPassword, login, UpdateCustomer, fetchCustomerById } = require('../controller/Customers');
const passport = require('passport');
require('dotenv').config();
const router = express.Router();
// const { Customer } = require('../model/Customers');

router
    .post('/register', register)
    .get('/', fetchAllCustomers)
    .get('/region', getVisitorsRegion)
    .post('/login', login)
    .post('/update/:id', UpdateCustomer)
    .post('/forgotPassword', forgotPassword)
    .delete('/delete/:customerId', deleteUser)
    .post('/updatePassword', updatePassword)
    .post('/verify-otp', verifyOtp)
    .get('/:id', fetchCustomerById)
    .post('/contact', contact)
    .post('/generateDummy', generateDummyProducts)
    .delete('/deleteAll', deleteAllProducts)



    .get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }))
    .get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: `${process.env.CLIENT_URL}login`
    }), google_callback)



    .get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['user_friends', 'manage_pages']
    }))
    .get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: `${process.env.CLIENT_URL}login`
    }), facebook_callback);



module.exports = router;
