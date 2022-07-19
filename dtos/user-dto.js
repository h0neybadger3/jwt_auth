const userDtoModel = model => {
    const email = model.email;
    const id = model._id;
    const isActivated = model.isActivated;
    return { email, id, isActivated };
};

module.exports = {
    userDtoModel,
};
