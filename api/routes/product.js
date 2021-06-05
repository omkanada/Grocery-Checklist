const express = require('express');
const router = express.Router();

const {
    save,
    getAllProducts,
    getProduct,
    remove,
} = require('../controller/product');

// Product
router.post('/add', save);
router.get('/getAll', getAllProducts);
router.get('/:productId', getProduct);
router.delete('/remove/:productId', remove);

module.exports = router;
