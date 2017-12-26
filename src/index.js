const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const Story = require('./models/Story');
require('./startDatabase');

const app = express();

app.get('/', (req, res) => res.send('Server is running'));

app.get('/story', (req, res) => {
    Story.find({})
    .then(stories => res.send({ success: true, stories }))
    .catch(error => res.send({ success: false, error: error.message }));
});

app.post('/story', parser, (req, res) => {
    const { content, title } = req.body;
    const story = new Story({ content, title });
    story.save()
    .then(newStory => res.send({ success: true, story: newStory }))
    .catch(error => res.send({ success: false, error: error.message }));
});

app.listen(3000, () => console.log('Server started!'));
