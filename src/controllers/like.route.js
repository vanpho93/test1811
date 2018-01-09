const express = require('express');
const Story = require('../models/Story');
const mustBeUser = require('./mustBeUser.middleware');

const router = express.Router();

router.post('/:idStory', mustBeUser, (req, res) => {
    Story.likeAStory(req.idUser, req.params.idStory)
    .then(story => res.send({ success: true, story }))
    .catch(err => res.status(404).send({ success: false, message: err.message }));
});

module.exports = router;
