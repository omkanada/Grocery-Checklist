const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.Promise = Promise;

const bcrypt = require('bcrypt');

// Define our user schema
const UserSchema = new Schema({
    name: { type: String, required: true },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        index: true,
    },
    token: {
        type: String,
        default: '',
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

UserSchema.pre('save', async function preSave(cb) {
    try {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        cb();
    } catch (error) {
        cb(error);
    }
});

UserSchema.methods.encryptPassword = function encryptPassword(password) {
    return bcrypt.hashSync(password, 10);
};

UserSchema.methods.verifyPassword = function verifyPassword(password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('user', UserSchema);