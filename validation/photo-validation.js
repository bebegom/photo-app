const {body} = require('express-validator');

const createPhotoRules = [
    body('title').exists().isString().isLength({min:3}),
    body('url').exists().isString().isURL(),
    body('comment').optional().isString().isLength({min:3}),
];

/* Rules for updating an existing photo */
const updatePhotoRules = [
    body('title').optional().isString().isLength({min:3}),
    body('comment').optional().isString().isLength({min:3}),
    body('url').optional().isString().isURL(),
];

module.exports = {
    createPhotoRules,
    updatePhotoRules,
}