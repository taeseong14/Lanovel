const router = require('express').Router();
const auth = require('../middleWares/auth');

router.post('/', auth, (req, res) => {
    res.json({ err: 0, login: true });
});

module.exports = router;