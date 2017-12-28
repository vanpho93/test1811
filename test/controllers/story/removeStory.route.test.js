const assert = require('assert');
const request = require('supertest');
const Story = require('../../../src/models/Story');
const app = require('../../../src/app');

describe.only('Test DELETE /story:id', () => {
    let _id;
    beforeEach('Create 2 stories for test', async () => {
        await Story.addStory('PHP', 'java');
        _id = (await Story.addStory('JS', 'javascript'))._id;
    });

    it('Can remove story with id', async () => {
        const { status, body } = await request(app).delete(`/story/${_id}`);
        assert.equal(status, 200);
        assert.equal(body.success, true);
        assert.equal(body.story.title, 'JS');
        const stories = await Story.find({});
        assert.equal(stories[0].title, 'PHP');
        assert.equal(stories.length, 1);
    });

    it('Cannot remove story with id twice', async () => {
        const { status, body } = await request(app).delete(`/story/${_id}`);
        assert.equal(status, 200);
        assert.equal(body.success, true);
        assert.equal(body.story.title, 'JS');
        const response = await request(app).delete(`/story/${_id}`);
        assert.equal(response.status, 404);
        assert.equal(response.body.success, false);
        const stories = await Story.find({});
        assert.equal(stories[0].title, 'PHP');
        assert.equal(stories.length, 1);
    });
});
