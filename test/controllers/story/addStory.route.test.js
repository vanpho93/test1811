const assert = require('assert');
const request = require('supertest');
const Story = require('../../../src/models/Story');
const app = require('../../../src/app');

describe('Test POST /story', () => {
    it('Can add new story by POST', async () => {
        const response = await request(app)
        .post('/story')
        .type('form')
        .send({ content: 'Javascript', title: 'JS' });
        assert.equal(response.status, 200);
        assert.equal(response.body.success, true);
        assert.equal(response.body.story.title, 'JS');
        const story = await Story.findOne({});
        assert.equal(story.title, 'JS');
        assert.equal(story.content, 'Javascript');
    });

    it('Cannot add 2 story with same title', async () => {
        await Story.addStory('PHP', 'PHP 321123');
        const response = await request(app)
        .post('/story')
        .type('form')
        .send({ content: 'Javascript', title: 'PHP' });
        assert.equal(response.body.success, false);
    });
});
