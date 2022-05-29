const router = require('express').Router();
const Database = require('../src/Database');

// router to prevent overlap of ids
router.post('/', (req, res) => {

    Database.GetUserById(req.body.id)

    .then((error, row) => {
        if (error) return res.json({ err: 1, message: 'unexpected error occured' });
        return res.json({ err: 0, result: !row, message: '' });
    })

    .catch(() => res.json({ err: 1, message: 'unexpected error occured' }));
});

module.exports = router;