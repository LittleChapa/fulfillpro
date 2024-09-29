const Router = require('express');
const userController = require('../controllers/userController');
const router = new Router();

router.post('/send', userController.sendFormData);

module.exports = router;
