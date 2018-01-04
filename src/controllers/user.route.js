const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
const { hash, compare } = require('bcrypt');
const User = require('../models/User');

const userRoute = express.Router();

userRoute.post('/signup', parser, (req, res) => {
    const { email, password, name } = req.body;
    hash(password, 8)
    .then(encrypted => {
        const user = new User({ email, password: encrypted, name });
        return user.save();
    })
    .then(u => {
        const u2 = u.toObject();
        delete u2.password;
        res.send({ success: true, user: u2 });
    })
    .catch(error => res.send({ success: false, message: error.message }));
});

userRoute.post('/signin', parser, (req, res) => {
});

module.exports = userRoute;
