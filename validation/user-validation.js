const {body} = require('express-validator');
const models = require('../models');

const registerRules = [
    body('email').exists().isString().isLength({min:4}).isEmail().custom(async value => {
        const user = await new models.users({ email: value }).fetch({ require: false });
        if(user) {
            return Promise.reject('email already exists.');
        }
        return Promise.resolve();
    }),
    body('password').exists().isString().isLength({min:6}),
    body('first_name').exists().isString().isLength({min:3}),
    body('last_name').exists().isString().isLength({min:3}),
];

module.exports = {
    registerRules,
};