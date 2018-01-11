const express = require('express');
const Comment = require('../models/Comment');
const mustBeUser = require('./mustBeUser.middleware');

const router = express.Router();

router.post('/', mustBeUser, (req, res) => {
    const { idStory, content } = req.body;
    Comment.createComment(req.idUser, idStory, content)
    .then(comment => res.send({ success: true, comment }))
    .catch(error => res.status(404).send({ success: false, message: error.message }));
});

module.exports = router;
