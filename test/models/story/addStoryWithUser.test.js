const assert = require('assert');
const Story = require('../../../src/models/Story');
const User = require('../../../src/models/User');

describe.only('Test add new story with user', () => {
    let _id;
    beforeEach('Create a user for test', async () => {
        const user = new User({ email: 'pho@gmail.com', name: 'Pho' });
        _id = user._id;
        await user.save();
    });
    it('Can add story for a user', async () => {
        const story = new Story({ title: 'JS', content: 'Javascript', author: _id });
        await story.save();
        const story2 = await Story.findOne({}).populate('author');
        assert.equal(story2.author.name, 'Pho');
        assert.equal(story2.author.email, 'pho@gmail.com');
    });  
});
