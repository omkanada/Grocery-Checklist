const express = require('express');
const router = express.Router();

const {
    save,
    getById,
} = require('../controller/favourite');

// Favourite
router.post('/add', save);
router.get('/get', getById);

module.exports = router;
