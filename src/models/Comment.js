const mongoose = require('mongoose');
const User = require('./User');
const Story = require('./Story');

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    story: { type: mongoose.Schema.Types.ObjectId, ref: 'Story' },
    content: { type: String, required: true },
    fans: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

const CommentModel = mongoose.model('Comment', commentSchema);

class Comment extends CommentModel {
    static async createComment(idUser, idStory) {
    }
}

module.exports = Comment;
