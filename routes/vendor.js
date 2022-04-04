const express = require('express');
const router = express.Router();
const VendorController = require('../Controller/VendorController');
const upload = require('../utils/multer');

router.get('/manageproduct/:id', VendorController.ManageProduct);
router.get('/createproduct/:id', VendorController.CreateProduct);
router.get('/vendorapplied', VendorController.VendorApplied);

router.post('/store/:id', upload.single('image'), VendorController.StoreProduct);

module.exports = router;