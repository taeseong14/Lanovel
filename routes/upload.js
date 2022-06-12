const router = require('express').Router();
const Database = require('../src/Database');
const auth = require('../middleWares/auth');
const user = require('../middleWares/user');
const multer = require('multer');
const fs = require('fs');
const sharp = require('sharp');

const path = 'statics/uploads';

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
    const nove = await Database.GetNoveById(nid);
    const { id } = await Database.GetLastEpisId();
    if (user.uid !== nove.uid) return res.json({ err: 1, message: 'you are not author' });
    const { content, nid, title, desc } = req.body;
    req.file.path && sharp(req.file.path)
        .resize({ width: 600 })
        .webp().withMetadata()
        .toBuffer((err, buf) => {
            if (err) return res.json({ err: 1, message: 'unexpected error occured' });
            fs.writeFileSync(req.file.path, buf);
        });

    if (!nove) return res.json({ err: 1, message: 'cannot find novel' });
    fs.writeFileSync(`${path}/${nid}/${id}.txt`, content);
    res.json({ err: 0, hash: id, message: 'success' });
    Database.Insert('epis', [ nid, title, desc, req.file.path || "/img/default.webp" ]);
});

module.exports = router;