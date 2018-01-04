const mongoose = require('mongoose');
const { hash, compare } = require('bcrypt');
const { sign } = require('../lib/jwt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
    password: { type: String, required: true }
});

const UserModel = mongoose.model('User', userSchema);
class User extends UserModel {
    static async signUp(email, password, name) {
        const encrypted = await hash(password, 8);
        const user = new User({ email, password: encrypted, name });
        await user.save();
        const u = user.toObject();
        delete u.password;
        return u;
    }

    static async signIn(email, password) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('Cannot find user');
        const same = await compare(password, user.password);
        if (!same) throw new Error('Password is incorrect');
        const u = user.toObject();
        delete u.password;
        const token = await sign({ _id: u._id });
        u.token = token;
        return u;
    }
}
module.exports = User;
