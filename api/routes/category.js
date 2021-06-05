const express = require('express');
const router = express.Router();

const { validate } = require('express-jsonschema');

const {
    save,
    getAll,
} = require('../controller/category');

// category
router.post('/', save);
router.get('/getAll', getAll);

module.exports = router;