const {body} = require('express-validator');
const models = require('../models');

const createPhotoRules = [
    body('title').exists(),
    body('url').exists(),
    body('user_id').exists().custom(async value => {
        const user = await new models.users({ id: value }).fetch({require: false});
        if(!user) {
            return Promise.reject(`User with ID ${value} does not exist.`)
        }

        return Promise.resolve();
    }),
    body('album_id').optional(),
    body('comment').optional(),
];

/* Rules for updating an existing photo */
const updatePhotoRules = [
    body('title').optional(),
    body('comment').optional(),
    body('url').optional(),
];

module.exports = {
    createPhotoRules,
    updatePhotoRules,
}