const mongoose = require('mongoose');

mongoose.Promise = Promise;

const { Schema } = mongoose;

// Define our category schema
const categorySchema = new Schema({
    name: { type: String, required: true },
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

module.exports = mongoose.model('category', categorySchema);
