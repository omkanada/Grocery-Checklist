const express = require('express');

const router = express.Router();
const { isAuthenticated } = require('../middlewares/authCheck');

const users = require('./users');
const category = require('./category');
const product = require('./product');
const cart = require('./cart');
const favourite = require('./favourite');

router.use(isAuthenticated);

router.use('/auth', users);
router.use('/category', category);
router.use('/product', product);
router.use('/cart', cart);
router.use('/favourite', favourite);

module.exports = router;
