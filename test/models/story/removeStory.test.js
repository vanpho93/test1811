const assert = require('assert');
const Story = require('../../../src/models/Story');
const User = require('../../../src/models/User');

describe.only('Test remove story', () => {
    let idUser;
    let idStory;
    beforeEach('Create a user for test', async () => {
        const user = new User({ email: 'pho@gmail.com', name: 'Pho' });
        idUser = user._id;
        await user.save();
        const story = await Story.addStoryWithUser(idUser, 'JS', 'Javascript');
        idStory = story._id;
    });
});
