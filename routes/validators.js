const express = require('express');
const router = express.Router();
const { getValidators } = require('../controllers/validatorsController');

router.get('/', getValidators);

module.exports = router;