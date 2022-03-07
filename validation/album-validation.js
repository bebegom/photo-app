/**
 * Album Validation Rules
 */

const { body } = require('express-validator');
const models = require('../models');

/**
 * Create Example validation rules
 *
 * Required: title
 * Optional: -
 */
const createAlbumRules = [
	body('title').exists().isString().isLength({ min: 3 }),
];

/**
 * Required: -
 * Optional: title
 */
const updateAlbumRules = [
	body('title').exists().isString().isLength({min:3}),
];

const addPhotoToAlbumRules = [
	body('photo_id').exists().isInt().custom(async value => {
        const photo = await new models.photos({ id : value }).fetch({ require: false });
        if(!photo) {
            return Promise.reject(`Photo with ID ${value} does not exist.`);
        }
        return Promise.resolve();
    }),
];

module.exports = {
	createAlbumRules,
	updateAlbumRules,
	addPhotoToAlbumRules,
}
