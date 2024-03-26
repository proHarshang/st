const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: false
    },
    dob: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    appartment: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    pincode: {
        type: String,
        required: false
    },
    countryCode: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    saveInfo: {
        type: Boolean,
        required: false
    },
    emailNewOffers: {
        type: Boolean,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    orders: [{
        type: String,
        required: false,
    }],
    token: {
        type: String,
        required: false
    },
    otp: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: new Date
    }
})

const virtualId = customerSchema.virtual('id');
virtualId.get(function () {
    return this._id;
})

customerSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})


exports.Customer = mongoose.model('Customer', customerSchema)