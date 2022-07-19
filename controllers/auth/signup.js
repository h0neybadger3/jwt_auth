const { validationResult } = require('express-validator');
const { BadRequest } = require('http-errors');
const { registration } = require('../../service/user-service');

const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequest('Validation error');
    }

    const { email, password } = req.body;
    const userData = await registration(email, password);
    res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    });
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            user: {
                userData,
            },
        },
    });
};

module.exports = signup;
