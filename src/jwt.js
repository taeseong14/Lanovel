const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const options = {
    algorithm : "HS256",
    expiresIn : "1d",
    issuer : "lanovel"
};

class JWT {

    static sign(payload) {

        return new Promise((resolve, reject) => {
            
            jwt.sign(payload, SECRET_KEY, options,
                (err, token) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(token);
                    }
                }
            );
        });
    }

    static verify(accessToken) {
        return new Promise((resolve, reject) => {
            jwt.verify(accessToken, SECRET_KEY,
                (err, decoded) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(decoded);
                    }
                }
            )
        });
    }

}

module.exports = JWT;