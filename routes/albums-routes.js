const express = require('express');
const router = express.Router();
const albumController= require('../controllers/albums-controller');
// const albumValidationRules = require('');

/* GET */
router.get('/', albumController.getalbums);
router.get('/:albumId', albumController.getOneAlbum);

/* POST */
// router.post('/', );
// router.post('/:albumId/photos', )

/* PUT */
// router.put('/:albumId', )

module.exports = router;
