const jwt = require('jsonwebtoken');
require('dotenv').config();
const { handleError } = require('./requestHandlers');
const { get } = require('../dbServices/user');

const skipUrls = [
    '/auth/register',
    '/auth/login'
];

module.exports.isAuthenticated = async function isAuthenticated(
    req,
    res,
    next,
) {
    let token;
    if (skipUrls.indexOf(req.url) !== -1) return next();
    if (req.headers.authorization !== undefined) {
        token = req.headers.authorization.split(' ')[1];
    }


    try {
        const user = await jwt.verify(token, process.env.APP_SECRET);
        req.user = await get(user._id, '_id');
        if (!req.user) throw 'Invalid token,No user exists';
        if (req.user.token !== token) {
            throw 'Your login session has expired';
        }
        if (user.isDeleted === true) {
            throw 'User is deleted';
        }
        return next();
    } catch (err) {
        return handleError({ res, err, statusCode: 401 });
    }
};
