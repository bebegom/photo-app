const debug = require('debug')('books:photos-controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

// Get all photos of the user
const getPhotos = async (req, res) => {
    const allPhotos = await new models.photos().where({ 'user_id': req.user.id }).fetchAll({ columns: ['id', 'title', 'url', 'comment'] });

    try {
        res.status(200).send({
            status: 'success',
            data: {
                user: allPhotos
            }
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when loading photos.'
        });
        throw error;
    }

};

// Get a specific photo of the user
const getOnePhoto = async (req, res) => {
    await req.user.load('photos');

    const onePhoto = await new models.photos({ id: req.params.photoId });

    // lazy-load
    const photoRelation = req.user.related('photos');
    // find the photo with the id 
    const foundPhoto = photoRelation.find(photo => photo.id == onePhoto.id);

    if(!foundPhoto) {
        return res.status(404).send({
            status: 'fail',
            data: 'An photo with that id could not be found in your list'
        });
    }

    const resPhoto = await new models.photos().where({ id: req.params.photoId }).fetchAll({ columns: ['id', 'title', 'url', 'comment'] });

    try {
        res.status(200).send({
            status: 'success',
            data: {resPhoto}
        })
    } catch (error) {
        res.status(500).send({
			status: 'error',
			message: "Exception thrown when attempting to get photo",
		});
		throw error;
    }
    
}

// Create a new photo
const addPhotos = async (req, res) => {
    // check for validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).send({ 
            status: 'fail', 
            data: errors.array() 
        })
    }
    // only get validated data we want 
    const validData = matchedData(req);
    validData.user_id = req.user.id;

    try {
        const photo = await new models.photos(validData).save();
        debug('Created new photo successfully: %O', photo);

        res.status(200).send({
            status: 'success',
            data: {photo}
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when creating a new photo.'
        });
        throw error;
    }
};

// Update an existing photo
const updatePhoto = async (req, res) => {
    await req.user.load('photos');

    const onePhoto = await new models.photos({ id: req.params.photoId });

    // lazy-load
    const photoRelation = req.user.related('photos');
    // find the photo with the id
    const foundPhoto = photoRelation.find(photo => photo.id == onePhoto.id);

    if(!foundPhoto) {
        return res.status(404).send({
            status: 'fail',
            data: 'Photo with that ID could not be found in your list.'
        });
    }

    // Check for errors
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).send({ 
            status: 'fail', 
            data: errors.array() 
        })
    }

    // only get validated data we want 
    const validData = matchedData(req);

    try {
        const updatedPhoto = await foundPhoto.save(validData);
        debug('Updated photo successfully: %O', updatePhoto);

        res.status(200).send({
            status: 'success',
            data: {updatedPhoto}
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when updating the photo.'
        });
        throw error;
    }
};

module.exports = {
    getPhotos,
    getOnePhoto,
    addPhotos,
    updatePhoto,
};