const mongoose = require('mongoose');

mongoose.Promise = Promise;

const { Schema } = mongoose;

// Define our cartProduct schema
const cartProductSchema = new Schema({
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'carts',
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
    },
    quantity: { type: String, required: true },
    netAmount: { type: String, required: true },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    modified: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('cartProduct', cartProductSchema);
