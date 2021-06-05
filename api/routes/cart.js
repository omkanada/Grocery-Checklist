const express = require('express');
const router = express.Router();

const {
    addProductToCart,
    removeProductFromCart,
    getCartProducts,
} = require('../controller/cart');

// Cart
router.post('/add', addProductToCart);
router.delete('/remove', removeProductFromCart);
router.get('/get', getCartProducts);

module.exports = router;
