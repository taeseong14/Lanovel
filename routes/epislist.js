const Database = require('../src/Database');

const router = require('express').Router();

router.post('/', async (req, res) => {
    const { nid } = req.body;
    if (!nid) return res.json({ err: 1, message: 'cannot find novel' });
    res.json({ err: 0, results: await Database.GetEpisById(nid) });
});

module.exports = router;