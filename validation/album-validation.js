/** Album Validation Rules **/

const { body } = require('express-validator');
const models = require('../models');


const createAlbumRules = [
	body('title').exists().isString().isLength({ min: 3 }),
];

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
