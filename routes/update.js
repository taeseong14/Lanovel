const router = require('express').Router();
const sqlite3 = require('../src/Database');
const auth = require('../middleWares/auth');

const Database = new sqlite3('database.db');

router.post('/', (req, res) => {

});

module.exports = router;