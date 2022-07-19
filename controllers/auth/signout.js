const { logout } = require('../../service/user-service');

const signout = async (req, res) => {
    const { refreshToken } = req.cookies;
    const token = await logout(refreshToken);
    res.clearCookie('refreshToken');
    res.status(204).json(token);
};

module.exports = signout;
