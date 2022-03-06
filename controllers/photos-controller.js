const debug = require('debug')('books:photos-controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

// get all photos of the user
const getPhotos = async (req, res) => {
    await req.user.load('photos');

    res.status(200).send({
        status: 'success',
        data: {
            user: req.user.related('photos'),
        }
    });

};

/** Get a photo of the user by id **/
const getOnePhoto = async (req, res) => {
    await req.user.load('photos');

    const onePhoto = await new models.photos({ id: req.params.photoId });

    // lazy-load photo-relation
    const photoRelation = req.user.related('photos');
    // find the photo with the id 
    const foundPhoto = photoRelation.find(photo => photo.id == onePhoto.id);

    res.send({
        status: 'success',
        data: {foundPhoto}
    })
}

/** Create a new photo **/
const addPhotos = async (req, res) => {
    // check for validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() })
    }
    // only get validated data we want 
    const validData = matchedData(req);

    try {
        const photo = await new models.photos(validData).save();
        debug('Created new photo successfully: %O', photo);

        res.send({
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
    // make sure the photo exists
    const photo = await new models.photos({ id: req.params.photoId }).fetch({ require: false });
    if(!photo) {
        return res.status(404).send({
            status: 'fail',
            data: 'Photo with that ID does not exist.'
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
        const updatedPhoto = await photo.save(validData);
        debug('Updated photo successfully: %O', photo);

        res.send({
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