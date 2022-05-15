const router = require('express').Router;
const sqlite3 = require('../src/Database');

const Database = new sqlite3('database.db');

// router to prevent overlap of ids
router.post('/', (req, res) => {

    Database.GetUserById(req.body.id)

    .then((error, row) => {
        if (error) return res.json({ status: 500, message: 'unexpected error occured' });
        return res.json({ status: 200, result: !row, message: '' });
    })

    .catch(() => res.json({ status: 500, message: 'unexpected error occured' }));
});

module.exports = router;