/**
 * ██╗░░░░░░█████╗░███╗░░██╗░█████╗░██╗░░░██╗███████╗██╗░░░░░
 * ██║░░░░░██╔══██╗████╗░██║██╔══██╗██║░░░██║██╔════╝██║░░░░░
 * ██║░░░░░███████║██╔██╗██║██║░░██║╚██╗░██╔╝█████╗░░██║░░░░░
 * ██║░░░░░██╔══██║██║╚████║██║░░██║░╚████╔╝░██╔══╝░░██║░░░░░
 * ███████╗██║░░██║██║░╚███║╚█████╔╝░░╚██╔╝░░███████╗███████╗
 * ╚══════╝╚═╝░░╚═╝╚═╝░░╚══╝░╚════╝░░░░╚═╝░░░╚══════╝╚══════╝
 */

require('dotenv').config();
const compression = require('compression');
const cookieParser = require('cookie-parser');
const express = require('express');
const jwt = require('./src/jwt');
const sqlite3 = require('./src/Database');
const app = express();

app.use(express.json());
app.use(compression());
app.use(cookieParser(process.env.COOKIE_KEY));
app.use(express.urlencoded({ extended: false }));

app.use(express.static('statics', {
    extensions: [ 'html', 'htm' ]
}));

app.disable('x-powered-by');

const Database = new sqlite3('database.db');

// router to prevent overlap of ids
app.post('/api/overlap', (req, res) => {

    Database.GetUserById(req.body.id)

    .then((error, row) => {
        if (error) return res.json({ status: 500, message: 'unexpected error occured' });
        return res.json({ status: 200, result: !row, message: '' });
    })

    .catch(() => res.json({ status: 500, message: 'unexpected error occured' }));
});

app.post('/api/isLogined', (req, res) => {

});

app.post('/api/login', (req, res) => {

    const { id, pw } = req.body;

    Database.GetUserById(id)

    .then((error, row) => {

        if (error) return res.json({ status: 500, message: 'unexpected error occured' });
        if (!row || row.pw !== pw) return res.json({ status: 400, message: 'invalid id or password' });

        const { accessToken, refreshToken } = jwt.sign(row.uid);

        res.cookie('token', {
            accessToken,
            refreshToken
        }, {
            httpOnly: true,
            signed: true,
            maxAge: 6048e5
        });

        return res.json({ status: 200, message: '' });
    })

    .catch(() => res.json({ status: 500, message: 'unexpected error occured' }));
});

app.post('/api/register', (req, res) => {

});

app.post('/api/upload', (req, res) => {

});

app.post('/api/update', (req, res) => {

});

app.post('/api/tempsave', (req, res) => {

});

app.get('*', (req, res) => res.redirect('/'));

app.listen(process.env.PORT = process.env.PORT || 6460, () => {
    console.log(`listening on port ${process.env.PORT}`);
});