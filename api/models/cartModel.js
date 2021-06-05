const mongoose = require('mongoose');

mongoose.Promise = Promise;

const { Schema } = mongoose;

// Define our cart schema
const cartSchema = new Schema({
    totalQuantity: { type: String, required: true },
    netAmount: { type: String, required: true },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
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

module.exports = mongoose.model('cart', cartSchema);
