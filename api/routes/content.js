const express = require('express');
const router = express.Router();

const {
    save,
    getById,
} = require('../controller/content');

// content
router.post('/', save);
router.get('/:productId', getById);

module.exports = router;
