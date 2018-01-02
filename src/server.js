const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser()); 

app.get('/muave', (req, res) => {
    res.cookie('DA_MUA_VE', 1);
    daMuaVe = true;
    res.send('Da mua ve');
});

app.get('/vaorap', (req, res) => {
    if (req.cookies.DA_MUA_VE) return res.send('Moi xem phim');
    res.send('Ban phai mua ve');
});

app.listen(3000, () => console.log('Server started!'));
