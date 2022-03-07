const {body} = require('express-validator');
const models = require('../models');

const createPhotoRules = [
    body('title').exists().isString().isLength({min:3}),
    body('url').exists().isString().isURL(),
    body('comment').optional().isString().isLength({min:3}),
];

/* Rules for updating an existing photo */
const updatePhotoRules = [
    body('title').optional().isString().isLength({min:3}),
    body('comment').optional().isString().isLength({min:3}),
    body('url').optional().isString(),
];

module.exports = {
    createPhotoRules,
    updatePhotoRules,
}