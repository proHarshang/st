const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    productId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    color: [{
        name: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true
        }
    }],
    size: [{
        sizeName: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true
        }
    }],
    productDetails: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    productType: [{
        type: String,
        required: true
    }],
    material: [{
        type: String,
        required: true
    }],
    images: {
        primary: {
            type: String,
            required: true
        },
        secondary: {
            type: String,
            required: true
        },
        general: [{
            type: String,
            required: true
        }]
    },
    launchDate: {
        type: Date,
        default: new Date
    },
    isNewProduct: {
        type: Boolean,
        default: true
    }
})

productSchema.set('toJSON', {
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id; // Remove _id field
    }
});

exports.Product = mongoose.model('Product', productSchema)