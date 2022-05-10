const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

class JWT {

    static sign(id) {
        return jwt.sign({ id }, SECRET, {
            expiresIn: '1 days'
        });
    }

    static verify(headers) {
        return jwt.verify(headers.authorization, SECRET);
    }

}

module.exports = JWT;