const express = require('express');
const router = express.Router();
const { getRestakers } = require('../controllers/restakersController');

router.get('/', getRestakers);

module.exports = router;
