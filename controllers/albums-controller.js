const debug = require('debug')('books:albums-controller');
// const { response } = require('express');
const { matchedData, validationResult, body } = require('express-validator');
const models = require('../models');

// get all albums of the user
const getalbums = async (req, res) => {
    await req.user.load('albums');

    res.status(200).send({
        status: 'success',
        data: {
            user: req.user.related('albums'),
        },
    });

};

const getOneAlbum = async (req, res) => {
    await req.user.load('albums');

    const oneAlbum = await new models.albums({ id: req.params.albumId });

    // lazy-load album-relation
    const albumRelation = req.user.related('albums');
    // find the album with the id
    const foundAlbum = albumRelation.find(album => album.id == oneAlbum.id);

    if(!foundAlbum) {
        return res.status(404).send({
            status: 'fail',
            data: 'An album with that id could not be found in your list'
        });
    }

    try {
        res.send({
            status: 'success',
            data: {foundAlbum}
        })
    } catch(error) {
        res.status(500).send({
            status: 'fail',
            message: error
        });
    }
};

const addAlbum = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() })
    }

    // only get validated data we want 
    const validData = matchedData(req);

    if(validData.user_id !== req.user.id) {
        return res.status(401).send({
            status: 'fail',
            data: validData.user_id + ' is not your user-ID.'
        })
    }

    try {
        const album = await new models.albums(validData).save();
        debug('Created new album successfully: %O', album);

        res.send({
            status: 'success',
            data: {album}
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when creating a new album.'
        });
        throw error;
    }
};

const updateAlbum = async (req, res) => {
    await req.user.load('albums');

    const oneAlbum = await new models.albums({ id: req.params.albumId });

    // lazy-load album-relation
    const albumRelation = req.user.related('albums');
    // find the album with the id
    const foundAlbum = albumRelation.find(album => album.id == oneAlbum.id);

    if(!foundAlbum) {
        return res.status(404).send({
            status: 'fail',
            data: 'An album with that id could not be found in your list'
        });
    }

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).send({
            status: 'fail',
            data: errors.array()
        });
    }

    //only get validated data that we want
    const validData = matchedData(req);

    try {
        const updatedAlbum = await foundAlbum.save(validData);
        debug('Updated album successfully: %O', updatedAlbum);

        res.send({
            status: 'success',
            data: {updatedAlbum}
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when updating the album.'
        });
        throw error;
    }
};

const addPhotoToAlbum = async (req, res) => {
    // Checking after errors before adding photo
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).send({ status : "fail", data: errors.array() });
    }
    const validData = matchedData(req); 

    // check if album belongs to user
    await req.user.load('albums');
    const oneAlbum = await new models.albums({ id: req.params.albumId });
    // lazy-load album-relation
    const albumRelation = req.user.related('albums');
    // find the album with the id
    const foundAlbum = albumRelation.find(album => album.id == oneAlbum.id);
    if(!foundAlbum) {
        return res.status(404).send({
            status: 'fail',
            data: 'An album with that id could not be found in your list'
        });
    }

    // check if photo belongs to user
    await req.user.load('photos');
    const onePhoto = await new models.photos({ id: validData.photo_id });
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

    if(validData.album_id.toString() !== req.params.albumId.toString()) {
        return res.status(405).send({
            status: 'fail',
            data: 'The album IDs needs to match'
        });
    }

    try {
        await new models.albumsPhotos(validData).save();

        res.send({
            status: 'success',
            data:   
                null,
        });

    } catch (error) {
        res.status(500).send({
			status: 'error',
			message: "Exception thrown when attempting to add photo",
		});
		throw error;
    }

};

module.exports = {
    getalbums,
    getOneAlbum,
    addAlbum,
    updateAlbum,
    addPhotoToAlbum,
};