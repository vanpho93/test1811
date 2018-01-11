const express = require('express');
const Comment = require('../models/Comment');
const mustBeUser = require('./mustBeUser.middleware');
const parser = require('body-parser').urlencoded({ extended: false });
const router = express.Router();

router.post('/', mustBeUser, parser, (req, res) => {
    const { storyId, content } = req.body;
    Comment.createComment(req.idUser, storyId, content)
    .then(comment => res.send({ success: true, comment }))
    .catch(error => res.status(404).send({ success: false, message: error.message }));
});

module.exports = router;
