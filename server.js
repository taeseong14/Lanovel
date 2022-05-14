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
const authMW = require('./middleWares/auth');

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

app.post('/api/login', async (req, res) => {

    const { id, pw } = req.body;

    Database.GetUserById(id)

    .then(async (row, error) => {
        
        if (error) return res.json({ status: 500, message: 'unexpected error occured' }); 
        if (!row || row.pw !== pw) return res.json({ status: 400, message: 'invalid id or password' });

        const token = await jwt.sign({ id: row.id });

        res.cookie('token', token, {
            httpOnly: true,
            signed: true,
            maxAge: 6048e5
        });

        return res.json({ status: 200, message: '' });
    })

    .catch(() => res.json({ status: 500, message: 'unexpected error occured' }));
});

app.post('/api/register', async (req, res) => {

    const { id, pw, name } = req.body;

    if (await Database.GetUserById(id))
        return res.json({ status: 400, message: 'already existing id' });
    
    if (id.length < 4) return res.json({ status: 400, message: 'invalid id length' });
    if (pw.length < 9) return res.json({ status: 400, message: 'invalid pw length' });
    
    await Database.Insert('user', [ id, pw, name ]);
    res.json({ status: 200, message: 'success' });
});

app.post('/api/upload', authMW, (req, res) => {

});

app.post('/api/update', authMW, (req, res) => {

});

app.post('/api/tempsave', authMW, (req, res) => {

});

app.get('*', (req, res) => res.redirect('/'));

app.listen(process.env.PORT = process.env.PORT || 6460, () => {
    console.log(`listening on port ${process.env.PORT}`);
});