const assert = require('assert');
const request = require('supertest');
const Story = require('../../../src/models/Story');
const app = require('../../../src/app');

describe.only('Test DELETE /story:id', () => {
    it('Can remove story with id', async () => {
        await Story.addStory('PHP', 'java');
        const { _id } = await Story.addStory('JS', 'javascript');
        const { status, body } = await request(app).delete(`/story/${_id}`);
        assert.equal(status, 200);
        assert.equal(body.success, true);
        assert.equal(body.story.title, 'JS');
    });

    it('Cannot remove story with id twice', async () => {
        await Story.addStory('PHP', 'java');
        const { _id } = await Story.addStory('JS', 'javascript');
        const { status, body } = await request(app).delete(`/story/${_id}`);
        assert.equal(status, 200);
        assert.equal(body.success, true);
        assert.equal(body.story.title, 'JS');
        const response = await request(app).delete(`/story/${_id}`);
        assert.equal(response.status, 404);
        assert.equal(response.body.success, false);
        
    });
});
