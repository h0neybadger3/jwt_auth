const { login } = require('../../service/user-service');

const signin = async (req, res) => {
    const { email, password } = req.body;

    const userData = await login(email, password);
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

module.exports = signin;
