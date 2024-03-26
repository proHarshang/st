const mongoose = require('mongoose');
const { Schema } = mongoose;

const careerApplySchema = new Schema({
    jobId: {
        type: String,
        required: true
    },
    myDocuments: [{
        type: String,
        required: true
    }],
    profileInformation: {
        firstName: String,
        middleName: String,
        lastName: String,
        email: String,
        number: Number,
        altNumber: Number,
        address: String,
        country: String,
        state: String,
        city: String,
        zipCode: String
    },
    previousEmployment: [{
        companyName: String,
        jobTitle: String,
        fromDate: String,
        endDate: String,
    }]
})

const virtualId = careerApplySchema.virtual('id');
virtualId.get(function () {
    return this._id;
})

careerApplySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

exports.CareerApply = mongoose.model('CareerApply', careerApplySchema)