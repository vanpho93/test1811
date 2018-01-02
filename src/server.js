const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'akjf183382473',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 20000 }
}));

app.get('/muave', (req, res) => {
    req.session.daMuaVe = true;
    res.send('Da mua ve');
});

app.get('/vaorap', (req, res) => {
    if (req.session.daMuaVe) return res.send('Moi xem phim');
    res.send('Ban phai mua ve');
});

app.listen(3000, () => console.log('Server started!'));
