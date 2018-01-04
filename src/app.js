const express = require('express');
const storyRoute = require('./controllers/story.route');
const userRoute = require('./controllers/user.route');
const app = express();

app.get('/', (req, res) => res.send('Server is running'));
app.use('/story', storyRoute);
app.use('/user', userRoute);

module.exports = app;
