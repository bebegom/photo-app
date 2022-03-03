const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photos-controller');

router.get('/', photoController.getPhotos);

// router.get photo:id

// post photo
router.post('/', /* photoController.addPhotos */ );

// put photo:id

module.exports = router;