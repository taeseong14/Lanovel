const randToken = require('rand-token');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const options = {
    algorithm : "HS256",
    expiresIn : "30m",
    issuer : "lanovel"
};

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

class JWT {

    static sign(uid) {
        const result = {
            accessToken: jwt.sign({ uid }, SECRET_KEY, options),
            refreshToken: randToken.uid(256)
        };
        return result;
    }

    static verify(token) {
        try {
            return jwt.verify(token, SECRET_KEY);
        } catch (err) {
            switch (err.message) {
                
            }
        }
    }

}

module.exports = JWT;