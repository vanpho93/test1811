const express = require('express');
const Comment = require('../models/Comment');
const mustBeUser = require('./mustBeUser.middleware');

const router = express.Router();

router.post('/', mustBeUser, (req, res) => {
});

module.exports = router;
