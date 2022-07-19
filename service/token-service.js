const jwt = require('jsonwebtoken');
const { Token } = require('../models');

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

const generateTokens = payload => {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
        expiresIn: '15s',
    });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: '30s',
    });
    return {
        accessToken,
        refreshToken,
    };
};

const saveToken = async (userId, refreshToken) => {
    const tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
};

const removeToken = async refreshToken => {
    const tokenData = await Token.deleteOne({ refreshToken });
    return tokenData;
};

const validateAccessToken = async token => {
    try {
        const userData = jwt.verify(token, JWT_ACCESS_SECRET);
        return userData;
    } catch (e) {
        return null;
    }
};

const validateRefreshToken = async token => {
    try {
        const userData = jwt.verify(token, JWT_REFRESH_SECRET);
        return userData;
    } catch (e) {
        return null;
    }
};

const findToken = async refreshToken => {
    const tokenData = await Token.findOne({ refreshToken });
    return tokenData;
};

module.exports = {
    generateTokens,
    saveToken,
    removeToken,
    validateAccessToken,
    validateRefreshToken,
    findToken,
};
