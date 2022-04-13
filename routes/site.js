const express = require('express');
const router = express.Router();

const SiteController = require('../Controller/SiteController');

router.get('/about', SiteController.AboutPage);

router.get('/', SiteController.HomePage);


router.get('/cart', SiteController.Cart);

module.exports = router;