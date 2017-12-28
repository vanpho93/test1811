const express = require('express');
const storyRoute = require('./controllers/story.route');
const app = express();

app.get('/', (req, res) => res.send('Server is running'));
app.use('/story', storyRoute);

module.exports = app;
