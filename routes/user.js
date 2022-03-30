const express=require('express');
const router=express.Router();
const UserController = require('../Controller/UserController');

router.get('/information', UserController.InformationPage);

router.get('/order', UserController.OrderPage);

module.exports = router;