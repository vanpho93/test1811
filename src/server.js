const express = require('express');
const cookieParser = require('cookie-parser');
const { sign, verify } = require('./lib/jwt');

const app = express();
app.use(cookieParser());

app.get('/muave', (req, res) => {
    sign({ daMuaVe: true })
    .then(token => {
        res.cookie('xtoken', token).send('Da mua ve');
    });
});

app.get('/vaorap', (req, res) => {
    const { xtoken } = req.cookies;
    verify(xtoken)
    .then(obj => {
        if (obj.daMuaVe) return res.send('Moi xem phim');
        res.send('Ban phai mua ve');
    })
    .catch(err => res.send('Ban phai mua ve'));
});

app.listen(3000, () => console.log('Server started!'));
