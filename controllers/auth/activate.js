const { activateLink } = require('../../service/user-service');

const { CLIENT_URL } = process.env;

const activate = async (req, res) => {
    const activationLink = req.params.link;
    await activateLink(activationLink);
    return res.status(201).redirect(CLIENT_URL);
};

module.exports = activate;
