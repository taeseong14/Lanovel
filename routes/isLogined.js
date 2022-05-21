const router = require('express').Router();
const auth = require('../middleWares/auth');

router.post('/api/isLogined', auth, (req, res) => {
    res.json({ err: 0, id: req.id });  
});

module.exports = router;