const debug = require('debug')('books:photos-controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

// get all photos of the user
// const getphotos = 

const getPhotos = async (req, res) => {
    await req.user.load('photos');

    res.status(200).send({
        status: 'success',
        data: {
            user: req.user.related('photos'),
        }
    });

};

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
        debug('Created new book successfully: %O', photo);

        res.send({
            status: 'success',
            data: {photo}
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when creating a new book.'
        });
        throw error;
    }
}

module.exports = {
    getPhotos,
    addPhotos
};