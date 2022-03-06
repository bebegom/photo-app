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
	body('title').exists().isLength({ min: 4 }),
	body('user_id').exists().custom(async value => {
        const user = await new models.users({ id: value }).fetch({require: false});
        if(!user) {
            return Promise.reject(`User with ID ${value} does not exist.`)
        }

        return Promise.resolve();
    }),
];

/**
 * Update Example validation rules
 *
 * Required: -
 * Optional: title
 */
const updateAlbumRules = [
	body('title').exists(),
];

const addPhotoToAlbumRules = [
	body('photo_id').exists().custom(async value => {
        const photo = await new models.photos({ id : value }).fetch({ require: false });
        if(!photo) {
            return Promise.reject(`Photo with ID ${value} does not exist.`);
        }
        return Promise.resolve();
    }),
    body('album_id').exists().custom(async value => {
        const album = await new models.albums({ id : value }).fetch({ require: false });
        if(!album) {
            return Promise.reject(`Album with ID ${value} does not exist.`);
        }
        return Promise.resolve();
    }),
    
];

module.exports = {
	createAlbumRules,
	updateAlbumRules,
	addPhotoToAlbumRules,
}
