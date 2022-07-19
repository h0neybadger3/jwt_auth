const { getAllUSers } = require('../../service/user-service');

const users = async (req, res) => {
    const allUsers = await getAllUSers();

    res.json({
        status: 'success',
        code: 200,
        data: {
            result: allUsers,
        },
    });
};

module.exports = users;
