const mongoose = require('mongoose');

mongoose.Promise = Promise;

const { Schema } = mongoose;

// Define our product schema
const contentSchema = new Schema({
    description: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'product' },
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

module.exports = mongoose.model('content', contentSchema);