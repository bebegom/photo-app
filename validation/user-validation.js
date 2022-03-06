const {body} = require('express-validator');
const models = require('../models');

const registerRules = [
    body('email').exists().isLength({min:4}).custom(async value => {
        const user = await new models.users({ email: value }).fetch({ require: false });
        if(user) {
            return Promise.reject('email already exists.');
        }
        return Promise.resolve();
    }),
    body('password').exists().isLength({min:4}),
    body('first_name').exists().isLength({min:2}),
    body('last_name').exists().isLength({min:2}),
];

module.exports = {
    registerRules,
};