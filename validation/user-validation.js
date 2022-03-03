const {body} = require('express-validator');

const registerRules = [
    body('email').exists().isLength({min:7}),
    body('password').exists().isLength({min:10}),
    body('first_name').exists().isLength({min:2}),
    body('last_name').exists().isLength({min:2}),
];

module.exports = {
    registerRules,
};