const mongoose = require('mongoose');
const { Schema } = mongoose;

const careerSchema = new Schema({
    jobId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobDiscription: {
        type: String,
        required: true
    },
    postedOn: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    jobTitle: {
        type: String,
        required: false
    },
    contractHours: {
        type: String,
        required: false
    },
    minExp: {
        type: String,
        required: false
    },
    languages: [{
        type: String,
        required: false
    }],
    assignment: [{
        type: String,
        required: false
    }],
    profile: {
        type: String,
        required: false
    }
})

const virtualId = careerSchema.virtual('id');
virtualId.get(function () {
    return this._id;
})

careerSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

exports.Career = mongoose.model('Career', careerSchema)