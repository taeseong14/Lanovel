const router = require('express').Router();
const Database = require('../src/Database');
const path = require('path');

router.get('/:hash', (req, res) => {
    const { hash } = req.params;

    Database.GetNoveById(hash)
    .then(row => {
        if (!row) return res.sendFile(path.join(__dirname, '../statics/error.html'));
        res.render('novel', { data: row });
    })
    .catch(() => {
        res.sendFile(path.join(__dirname, '../statics/error.html'));
    });
});

module.exports = router;