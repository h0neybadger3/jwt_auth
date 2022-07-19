const express = require('express');
const { body } = require('express-validator');
const { ctrlWrapper, auth } = require('../../middlewares');
const { auth: ctrl } = require('../../controllers');

const router = express.Router();

router.post(
    '/signup',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    ctrlWrapper(ctrl.signup)
);
router.post('/signin', ctrlWrapper(ctrl.signin));
router.post('/signout', ctrlWrapper(ctrl.signout));
router.get('/activate/:link', ctrlWrapper(ctrl.activate));
router.get('/refresh', ctrlWrapper(ctrl.refresh));
router.get('/users', auth, ctrlWrapper(ctrl.users));

module.exports = router;
