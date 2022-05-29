const router = require('express').Router();
const Database = require('../src/Database');

router.post('/', async (req, res) => {

    const { id, pw, name } = req.body;

    if (await Database.GetUserById(id))
        return res.json({ err: 1, message: 'already existing id' });
    
    if (id.length < 4) return res.json({ err: 1, message: 'invalid id length' });
    if (pw.length < 9) return res.json({ err: 1, message: 'invalid pw length' });
    
    await Database.Insert('user', [ id, pw, name ]);
    res.json({ err: 0, message: 'success' });
});

module.exports = router;