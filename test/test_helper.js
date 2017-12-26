const Story = require('../src/models/Story');
require('../src/startDatabase');

beforeEach('Remove all docs before it', async () => {
    await Story.remove({});
});
