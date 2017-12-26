const assert = require('assert');
const Story = require('../../../src/models/Story');

describe('Test static method addStory', () => {
    it('Can add new story with full info', async () => {
        await Story.addStory('JS', 'abcd');
        const n = await Story.count({ title: 'JS' });
        assert.equal(n, 1);
    });
});
