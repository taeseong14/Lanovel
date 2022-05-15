const router = require('express').Router;
const authMW = require('../middleWares/auth');

router.post('/api/isLogined', authMW, (req, res) => {
    res.json({ status: 200, id: req.id });  
});

module.exports = router;