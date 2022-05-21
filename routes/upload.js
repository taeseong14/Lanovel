const router = require('express').Router();
const sqlite3 = require('../src/Database');
const auth = require('../middleWares/auth');
const user = require('../middleWares/user');
const multer = require('multer');
const fs = require('fs');
const sharp = require('sharp');

const Database = new sqlite3('database.db');

const path = 'statics/uploads/';

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, path);
        },
        async filename(req, file, cb) {
            const { id } = await Database.GetLastEpisId();
            cb(null, `${id}.webp`);
        }
    })
}).single('img');


router.post('/', auth, user, upload, async (req, res) => {
    sharp(req.file.path)
        .resize({ width: 600 })
        .webp().withMetadata()
        .toBuffer((err, buf) => {
            if (err) throw err;
            fs.writeFileSync(req.file.path, buf);
        });
    const { content, nid, title, desc } = req.body;
    const nove = await Database.GetNoveById(nid);
    const { id } = await Database.GetLastEpisId();

    if (!nove) return res.json({ err: 1, message: 'cannot find novel' });
    fs.writeFileSync(`${path}${id}.txt`, content);
    res.json({ err: 0, hash: id, message: '' });
});

module.exports = router;