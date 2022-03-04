const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photos-controller');
const photoValidationRules = require('../validation/photo-validation');

/* GET */
router.get('/', photoController.getPhotos);
router.get('/:photoId', photoController.getOnePhoto);

/* POST */
router.post('/', photoValidationRules.createPhotoRules, photoController.addPhotos);

/* PUT */
router.put('/:photoId', photoValidationRules.updatePhotoRules, photoController.updatePhoto);

module.exports = router;