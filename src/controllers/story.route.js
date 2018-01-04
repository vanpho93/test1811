const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const Story = require('../models/Story');
const { verify } = require('../lib/jwt');

const router = express.Router();

router.get('/', (req, res) => {
    Story.find({}).populate('author', 'name')
    .then(stories => res.send({ success: true, stories }))
    .catch(error => res.send({ success: false, error: error.message }));
});

router.get('/:id', (req, res) => {
    Story.findById(req.params.id)
    .then(story => {
        if (!story) return res.status(404).send({
            success: false,
            message: 'Cannot find story'
        });
        res.send({ success: true, story });
    })
    .catch(error => res.status(404).send({ success: false, error: error.message }));
});

router.post('/', parser, (req, res) => {
    const { content, title } = req.body;
    verify(req.headers.token)
    .then(obj => Story.addStoryWithUser(obj._id, title, content))
    .then(newStory => res.send({ success: true, story: newStory }))
    .catch(error => res.status(400).send({ success: false, error: error.message }));
});

router.delete('/:id', (req, res) => {
    verify(req.headers.token)
    .then(obj => Story.findByIdAndRemove(req.params.id))
    .then(story => {
        if (!story) return res.status(404).send({
            success: false,
            message: 'Cannot find story'
        });
        res.send({ success: true, story });
    })
    .catch(error => res.status(400).send({ success: false, error: error.message }))
});

module.exports = router;
