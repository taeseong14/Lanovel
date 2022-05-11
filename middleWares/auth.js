const jwt = require('../src/jwt');

module.exports = function(req, res, next) {
    
    if (req.method !== 'POST') return next();

    try {

        req.uid = jwt.verify(req.headers);
        return next();

    } catch(error) {

        if (error.name === 'TokenExpiredError') {
            return res.status(500).json({
                code: 500,
                message: '토큰이 만료되었습니다'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(500).json({
                code: 500,
                message: '올바르지 않은 토큰입니다'
            });
        }
    }
};