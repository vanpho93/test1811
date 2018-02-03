const assert = require('assert');
const request = require('supertest');
const Story = require('../../../src/models/Story');
const User = require('../../../src/models/User');
const Comment = require('../../../src/models/Comment');
const app = require('../../../src/app');

describe('POST /like/:idObject', () => {
    let token1, token2, storyId, commentId;

    beforeEach('Create user for test', async () => {
        await User.signUp('pho1@gmail.com', '123', 'Pho');
        await User.signUp('pho2@gmail.com', '123', 'Pho 2');
        const user1 = await User.signIn('pho1@gmail.com', '123');
        const user2 = await User.signIn('pho2@gmail.com', '123');
        const story = await Story.addStoryWithUser(user1._id, 'JS', 'Javascript');
        await Story.addStoryWithUser(user1._id, 'PHP', 'My SQL');
        const comment = await Comment.createComment(user2._id, story._id, 'abcd');
        token1 = user1.token;
        token2 = user2.token;
        storyId = story._id.toString();
        commentId = comment._id.toString();
    });

    it('Can like a comment', async () => {
        const response = await request(app)
        .post(`/like/${commentId}`)
        .set({ token: token1 })
        .send({ forComment: true });
        assert.equal(response.body.success, true);
    });
});
