const express = require('express');
const router = express.Router();
const VendorController = require('../Controller/VendorController');
const upload = require('../utils/multer');

router.get('/manageproduct/:id', VendorController.ManageProduct);
router.get('/manageorder/:id', VendorController.ManageOrder);

router.post('/deleteproduct/:id', VendorController.deleteProduct)

router.get('/createproduct/:id', VendorController.CreateProduct);

router.get('/vendorapplied', VendorController.VendorApplied);

router.post('/store/:id', upload.single('image'), VendorController.StoreProduct);

router.get('/:id/edit', VendorController.editForm);
router.put('/edit/:id', upload.single('image'), VendorController.updateProduct);

router.get('/:id/delete', VendorController.deleteForm);
router.delete('/delete/:id', VendorController.deleteProduct);

router.put('/manageorder/:id',VendorController.changeStatusOrder);

module.exports = router;