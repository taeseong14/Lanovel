const router = require('express').Router();
const auth = require('../middleWares/auth');
const randtoken = require('rand-token');
const fs = require('fs');

const text_path = 'statics/text/';

router.post('/', auth, (req, res) => {

    const { text } = req.body;
    const uid = randtoken.uid(16);

    fs.writeFileSync(`${text_path}${uid}.txt`, text);
    res.json({ status: 200, hash: uid, message: '' });
});

module.exports = router;