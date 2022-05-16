const jwt = require('../src/jwt');

module.exports = async function(req, res, next) {

    const { token } = req.signedCookies;

   jwt.verify(token).then(id => {
        req.id = id; next();
   })
    .catch(error => {
        if (error.name === 'TokenExpiredError') {
            return res.status(500).json({
                status: 500,
                message: 'token expired'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(500).json({
                status: 500,
                message: 'invalid token'
            });
        }
   });
};