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

const app = express();

app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser(process.env.COOKIE_KEY));
app.use(express.urlencoded({ extended: false }));

app.use(express.static('statics', {
    extensions: [ 'html', 'htm' ]
}));

app.disable('x-powered-by');

app.use('/api/isLogined', require('./routes/isLogined'));
app.use('/api/login', require('./routes/login'));
app.use('/api/overlap', require('./routes/overlap'));
app.use('/api/register', require('./routes/register'));
app.use('/api/tempsave', require('./routes/tempsave'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/update', require('./routes/update'));
app.use('/api/uploadText', require('./routes/uploadText'));
app.use('/api/uploadTimg', require('./routes/uploadTimg'));

app.get('*', (req, res) => res.redirect('/'));

app.listen(process.env.PORT = process.env.PORT || 6460, () => {
    console.log(`listening on port ${process.env.PORT}`);
});