const zlib = require('zlib');

class Zlib {

    static async encode(string) {
        return new Promise(resolve => {
            zlib.deflate(string, (err, buf) => {
                resolve(buf.toString('base64'));
            });
        });
    }

    static async decode(string) {
        return new Promise((resolve, reject) => {
            zlib.unzip(new Buffer(string, 'base64'), (err, buf) => {
                err ? reject(err) : resolve(buf.toString());
            });
        });
    }

}

module.exports = Zlib;