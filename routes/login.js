const express=require('express');
const router=express.Router();
const LoginController = require('../Controller/LoginController');

//sign up
router.get('/signup', LoginController.signupPage);
router.post('/signup', LoginController.register);

//verify after resgister
router.get('/verify/:emailToken', LoginController.activeNewAccount)
router.get('/verify', LoginController.verifyPage);

//forget password
router.get('/forget', LoginController.forgetPasswordPage);
router.post('/forget', LoginController.sendNewPassword);

router.get('/', LoginController.loginPage);
router.post('/', LoginController.authenticate);

module.exports = router;