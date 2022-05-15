const router = require('express').Router();
const auth = require('../middleWares/auth');

router.post('/api/isLogined', auth, (req, res) => {
    res.json({ status: 200, id: req.id });  
});

module.exports = router;