const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    content: { type: String, required: true },
    title: { type: String, required: true }
});

const StoryModel = mongoose.model('Story', storySchema);

class Story extends StoryModel {}

module.exports = Story;
