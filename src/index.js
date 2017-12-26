require('./startDatabase');
const app = require('./app');

app.listen(3000, () => console.log('Server started!'));
