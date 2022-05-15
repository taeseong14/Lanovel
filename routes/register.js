const router = require('express').Router;
const sqlite3 = require('../src/Database');

const Database = new sqlite3('database.db');

router.post('/', async (req, res) => {

    const { id, pw, name } = req.body;

    if (await Database.GetUserById(id))
        return res.json({ status: 400, message: 'already existing id' });
    
    if (id.length < 4) return res.json({ status: 400, message: 'invalid id length' });
    if (pw.length < 9) return res.json({ status: 400, message: 'invalid pw length' });
    
    await Database.Insert('user', [ id, pw, name ]);
    res.json({ status: 200, message: 'success' });
});

module.exports = router;