const router = require('express').Router;
const sqlite3 = require('../src/Database');
const Database = new sqlite3('database.db');

router.post('/', async (req, res) => {

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

module.exports = router;