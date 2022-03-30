const express=require('express');
const router=express.Router();
const LoginController = require('../Controller/LoginController');

router.get('/forget', LoginController.forgetPage);

router.get('/', LoginController.loginPage);

module.exports = router;