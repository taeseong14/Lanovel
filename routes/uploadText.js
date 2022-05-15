const router = require('express').Router();
const auth = require('../middleWares/auth');
const fs = require('fs');

router.post('/', auth, (req, res) => {

});

module.exports = router;