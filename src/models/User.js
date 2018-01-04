const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
    password: { type: String, required: true }
});

const UserModel = mongoose.model('User', userSchema);

class User extends UserModel {}
module.exports = User;
