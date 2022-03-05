const express = require('express');
const router = express.Router();
const userValidation = require('../validation/user-validation');
const registerController = require('../controllers/register-controller');
const auth = require('../middlewares/auth');


/* GET */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'oh, hi' }});
});

router.use('/register', userValidation.registerRules, registerController.register);

router.use('/albums', auth.basic, require('./albums-routes'));
router.use('/photos', auth.basic, require('./photos-routes'));


module.exports = router;
