const { Unauthorized } = require('http-errors');
const { validateAccessToken } = require('../service/token-service');

const auth = (req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    try {
        if (bearer !== 'Bearer') {
            throw new Unauthorized('Not authorized');
        }
        if (!token) {
            throw new Unauthorized('Not authorized');
        }
        const userData = validateAccessToken(token);
        if (!userData) {
            throw new Unauthorized('Not authorized');
        }

        req.user = userData;
        next();
    } catch (error) {
        if (error.message === 'Invalid sugnature') {
            error.status = 401;
        }
        next(error);
    }
};

module.exports = auth;
