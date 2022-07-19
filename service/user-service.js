const { Conflict, NotFound, Unauthorized } = require('http-errors');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const {
    generateTokens,
    saveToken,
    removeToken,
    validateRefreshToken,
    findToken,
} = require('./token-service');
const { sendActivationMail } = require('./mail-service');
const { userDtoModel } = require('../dtos/user-dto.js');

const { API_URL } = process.env;

const registration = async (email, password) => {
    const candidate = await User.findOne({ email });
    if (candidate) {
        throw new Conflict(`User with ${email} already exist`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await User.create({ email, password: hashPassword, activationLink });
    await sendActivationMail(email, `${API_URL}/api/activate/${activationLink}`);

    const userDto = userDtoModel(user);
    const tokens = generateTokens(userDto);
    await saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
};

const activateLink = async activationLink => {
    const user = await User.findOne({ activationLink });
    if (!user) {
        throw new NotFound(`User not found`);
    }

    user.isActivated = true;
    await user.save();
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new NotFound(`User with ${email} not found`);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
        throw new Conflict('Invalid password');
    }
    const userDto = userDtoModel(user);
    const tokens = generateTokens(userDto);
    await saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
};

const logout = async refreshToken => {
    const token = await removeToken(refreshToken);
    return token;
};

const refreshAccess = async refreshToken => {
    if (!refreshToken) {
        throw new Unauthorized('Unauthorized');
    }
    const userData = validateRefreshToken(refreshToken);
    const tokenFromDb = await findToken(refreshToken);
    if (!userData || !tokenFromDb) {
        throw new Unauthorized('Unauthorized');
    }

    const user = await User.findById(userData.id);
    const userDto = userDtoModel(user);
    const tokens = generateTokens(userDto);
    await saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
};

const getAllUSers = async () => {
    const users = await User.find({});
    return users;
};

module.exports = {
    registration,
    activateLink,
    login,
    logout,
    refreshAccess,
    getAllUSers,
};
