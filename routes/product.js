const express = require('express');
const router = express.Router();

const productController = require('../Controller/ProductController');

router.get('/', productController.allList);

router.get('/:slug', productController.showDetail);

module.exports = router;