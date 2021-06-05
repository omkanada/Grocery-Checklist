const mongoose = require('mongoose');

mongoose.Promise = Promise;

const { Schema } = mongoose;

// Define our product schema
const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: String, default: '0' },
    categoryId: { type: Schema.Types.ObjectId, ref: 'categories' },
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

module.exports = mongoose.model('product', productSchema);
