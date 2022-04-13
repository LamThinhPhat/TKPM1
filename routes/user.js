const express=require('express');
const router=express.Router();
const UserController = require('../Controller/UserController');

//change password
router.get('/changepassword', UserController.changePassword);
router.post('/changepassword/:id', UserController.storeNewPass);

router.get('/order', UserController.OrderPage);

router.get('/cart', UserController.Cart);

router.get('/logout', UserController.logOut);

//update information
router.post('/:id', UserController.storeUpdateInformation);
router.get('/information', UserController.InformationPage);

//apply for vendor
router.get('/applyforvendor/:id',UserController.applyForVendor);

router.delete('/cart/:id', UserController.deleteCart);

router.put('/cart/:id', UserController.updateCart);


module.exports = router;