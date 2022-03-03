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

    // only get validated data we want 
}

module.exports = {
    getPhotos,
    addPhotos
};