const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

function getDatabaseUri() {
    if (process.env.NODE_ENV === 'test') return 'mongodb://localhost/mean1811-test';
    return 'mongodb://localhost/mean1811';
}

mongoose.connect(getDatabaseUri())
.catch(err => {
    console.log(err.message);
    process.exit(1);
});
