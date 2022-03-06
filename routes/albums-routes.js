const express = require('express');
const router = express.Router();
const albumController= require('../controllers/albums-controller');
const albumValidationRules = require('../validation/album-validation');

/* GET */
router.get('/', albumController.getalbums);
router.get('/:albumId', albumController.getOneAlbum);

/* POST */
router.post('/', albumValidationRules.createAlbumRules, albumController.addAlbum );
router.post('/:albumId/photos', albumValidationRules.addPhotoToAlbumRules, albumController.addPhotoToAlbum)

/* PUT */
router.put('/:albumId', albumValidationRules.updateAlbumRules, albumController.updateAlbum)

module.exports = router;
