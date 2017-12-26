const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    content: { type: String, required: true },
    title: { type: String, required: true, unique: true }
});

const StoryModel = mongoose.model('Story', storySchema);

class Story extends StoryModel {
    static addStory(title, content) {
        const story = new Story({ content, title });
        return story.save()
    }
}

module.exports = Story;
