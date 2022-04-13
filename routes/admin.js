const express = require('express');
const router = express.Router();
const AdminController = require('../Controller/AdminController');

router.get('/manageuser', AdminController.ManageUser);

router.get('/managevoucher', AdminController.ManageVoucher);

module.exports = router;