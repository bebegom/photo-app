const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photos-controller');
const photoValidationRules = require('../validation/photo-validation');

router.get('/', photoController.getPhotos);

router.get('/:photoId', photoController.getOnePhoto);

// post photo
router.post('/', photoValidationRules.createPhotoRules, photoController.addPhotos);

// put photo:id

module.exports = router;