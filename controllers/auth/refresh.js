const { refreshAccess } = require('../../service/user-service');

const refresh = async (req, res) => {
    const { refreshToken } = req.cookies;
    const userData = await refreshAccess(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    });
    res.json({
        status: 'success',
        code: 200,
        user: {
            userData,
        },
    });
};

module.exports = refresh;
