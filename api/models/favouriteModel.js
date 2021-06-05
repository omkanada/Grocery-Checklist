const mongoose = require('mongoose');

mongoose.Promise = Promise;

const { Schema } = mongoose;

// Define our product schema
const checklistSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
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

module.exports = mongoose.model('checklist', checklistSchema);