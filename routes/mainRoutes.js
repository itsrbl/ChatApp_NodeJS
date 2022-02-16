const express = require('express');
const router = express.Router();
const controller = require('../controller/mainController');

router.get('/', controller.Index);

module.exports = router;