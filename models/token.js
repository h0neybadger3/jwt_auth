const { Schema, model } = require('mongoose');

const tokenSchema = Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        refreshToken: {
            type: String,
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
);

// const joiRegisterSchema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().required(),
//     password: Joi.string().min(6).required(),
// });

// const joiLoginSchema = Joi.object({
//     email: Joi.string().required(),
//     password: Joi.string().min(6).required(),
// });

const Token = model('token', tokenSchema);

module.exports = {
    Token,
};
