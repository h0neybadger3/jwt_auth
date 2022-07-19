const { Schema, model } = require('mongoose');

const userSchema = Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        isActivated: {
            type: Boolean,
            default: false,
        },
        activationLink: {
            type: String,
        },
    },
    { versionKey: false, timestamps: true }
);

const User = model('user', userSchema);

module.exports = {
    User,
};
