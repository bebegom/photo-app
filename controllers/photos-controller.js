const debug = require('debug')('books:photos-controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

// get all photos of the user
const getPhotos = async (req, res) => {
    await req.user.load('photos');

    try {
        res.status(200).send({
            status: 'success',
            data: {
                user: req.user.related('photos'),
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

/** Get a photo of the user by id **/
const getOnePhoto = async (req, res) => {
    await req.user.load('photos');

    const onePhoto = await new models.photos({ id: req.params.photoId });

    // lazy-load photo-relation
    const photoRelation = req.user.related('photos');
    // find the photo with the id 
    const foundPhoto = photoRelation.find(photo => photo.id == onePhoto.id);

    if(!foundPhoto) {
        return res.status(404).send({
            status: 'fail',
            data: 'An photo with that id could not be found in your list'
        });
    }

    try {
        res.status(200).send({
            status: 'success',
            data: {foundPhoto}
        })
    } catch (error) {
        res.status(500).send({
			status: 'error',
			message: "Exception thrown when attempting to get photo",
		});
		throw error;
    }
    
}

/** Create a new photo **/
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

/* Update an existing photo */
const updatePhoto = async (req, res) => {
    await req.user.load('photos');

    const onePhoto = await new models.photos({ id: req.params.photoId });

    // lazy-load album-relation
    const photoRelation = req.user.related('photos');
    // find the album with the id
    const foundPhoto = photoRelation.find(album => album.id == onePhoto.id);

    if(!foundPhoto) {
        return res.status(404).send({
            status: 'fail',
            data: 'Photo with that ID could not be found in your list.'
        });
    }


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