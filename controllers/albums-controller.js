const debug = require('debug')('books:photos-controller');
const { response } = require('express');
const { matchedData, validationResult } = require('express-validator');
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

    res.send({
        status: 'success',
        data: {foundAlbum}
    })
};

module.exports = {
    getalbums,
    getOneAlbum,
};