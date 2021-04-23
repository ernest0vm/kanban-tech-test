var express = require('express');
var router = express.Router();
var keyStore = require('../key-store');

router.get('/auth', keyStore);

module.exports = router;
