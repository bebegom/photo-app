const debug = require('debug')('books:albums-controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

// get all albums of the user
const getalbums = async (req, res) => {
    await req.user.load('albums');

    try {
        res.status(200).send({
            status: 'success',
            data: {
                user: req.user.related('albums'),
            },
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when loading albums.'
        });
        throw error;
    }

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

    // get the related photos
    const album = await new models.albums({ id: req.params.albumId }).fetch({ withRelated: ['photos'] });
    

    try {
        res.status(200).send({
            status: 'success',
            data: {album}
        })
        // debug();
    } catch(error) {
        res.status(500).send({
            status: 'error',
            message: error
        });
        throw error;
    }
};

const addAlbum = async (req, res) => {
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
        const album = await new models.albums(validData).save();
        debug('Created new album successfully: %O', album);

        res.status(200).send({
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

        res.status(200).send({
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
        return res.status(422).send({ 
            status : "fail", 
            data: errors.array() 
        });
    }
    const validData = matchedData(req); 
    validData.album_id = req.params.albumId;

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

    const album = await new models.albums({ id: req.params.albumId }).fetch({ withRelated: ['photos'] });

    const photos = album.related('photos');
    const existingPhoto = photos.find(photo => photo.id == validData.photo_id);

    if(existingPhoto) {
        return res.status(422).send({
            status: 'fail',
            data: 'Photo already exist'
        })
    }

    try {
        await new models.albumsPhotos(validData).save();

        res.status(200).send({
            status: 'success',
            data: null
        });

    } catch (error) {
        res.status(500).send({
			status: 'error',
			message: "Exception thrown when attempting to add photo in album",
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